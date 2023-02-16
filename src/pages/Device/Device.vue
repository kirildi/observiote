<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import InteractiveMap from "../../components/interactive/InteractiveMap.vue";

import Cookies from "js-cookie";

import { HTTP } from "../../components/httpObject";
// import InteractiveMap from "../components/interactive/InteractiveMap.vue";

function createHttpBody(_authToken: any) {
  return {
    authToken: _authToken,
    // deviceId: "?",
  };
}

const devicesData = ref([] as any[]);
let authToken: any;
let deviceList: any;
let fetchDevicesInterval: NodeJS.Timer;

async function fetchDevices() {
  authToken = Cookies.get("token");
  const requestBody = createHttpBody(authToken);

  const deviceRequest = await HTTP.post("/iotpp/rest/device_service", requestBody, {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  sessionStorage.setItem("deviceList", JSON.stringify(deviceRequest.data));
}

function toggleElementInfo(tempId: Number) {
  const dev: Element | null = document.querySelector(`.device-${tempId}-info-content`);
  dev.classList.toggle("w3-hide");
}

onMounted(() => {
  if (deviceList) {
    devicesData.value = JSON.parse(deviceList);
  } else {
    const res = fetchDevices();

    res
      .then(() => {
        deviceList = sessionStorage.getItem("deviceList");
        devicesData.value = JSON.parse(deviceList);
        //   store.dispatch("alertStore/removeError");
      })
      .catch((e) => {
        //   store.dispatch("alertStore/setError", {
        //     type: "ERROR",
        //     code: e.response.status,
        //     message: e.response.statusText,
        //   });
      });
  }
});
watchEffect(() => {
  const requestInterval = 600000;
  fetchDevicesInterval = setInterval(() => {
    const res = fetchDevices();
    res
      .then(() => {
        deviceList = sessionStorage.getItem("deviceList");
        devicesData.value = JSON.parse(deviceList);
        //   store.dispatch("alertStore/removeError");
      })
      .catch((e) => {
        //   store.dispatch("alertStore/setError", {
        //     type: "ERROR",
        //     code: e.response.status,
        //     message: e.response.statusText,
        //   });
      });
  }, requestInterval);
});
onUnmounted(() => {
  clearInterval(fetchDevicesInterval);
});
</script>
<template>
  <div class="container relative p-4">
    <div v-if="!devicesData" class="device-content absolute left-24">
      <h3>Notice:</h3>
      <p>Devices, should be automatically displayed here. If you read this there should be an error or no connection to the server.</p>
    </div>
    <div v-else class="device-content absolute left-24">
      <ul>
        <li v-for="(device, index) in devicesData" :key="index" class="device-element">
          <div style="height: 3em; padding: 0.6em">
            <router-link
              :to="{
                name: 'device',
                params: { id: device.deviceId },
              }">
              <!--STATUS ICON-->
              <div class="fa fa-desktop device-status-icon" aria-hidden="true"></div>
              <!--DEVICE NAME-->
              <div class="device-name">
                {{ device.deviceName }}
              </div>
            </router-link>
            <!--TOGGLE INFO-->
            <div class="fa fa-chevron-down device-toggle-info" aria-hidden="true" @click="toggleElementInfo(device.deviceId)"></div>
          </div>
          <!--INFO CONTENT-->
          <div :class="'device-' + device.deviceId + '-info-content device-info-style w3-hide'">
            <div v-if="device.deviceImage === ''">
              <img :id="'device-img-' + device.deviceId" src="http://" alt=" No image found" class="w3-show w3-image" />
            </div>
            <div v-else class="">
              <img :id="'device-img-' + device.deviceId" :src="device.deviceImage" class="w3-show w3-image" :alt="device.deviceName" />
            </div>
            <div :id="'show-info-' + device.deviceId" class="device-info">
              <ul>
                <li>ID: {{ device.deviceId }}</li>
                <li>Date created: {{ device.deviceCreateDate }}</li>
                <li>Date modified:{{ device.deviceLastModifyDate }}</li>
                <li>Coordinates: [{{ device.deviceCoordinates }}]</li>
              </ul>
              <div class="w3-small text-wrap">Description: {{ device.deviceDescription }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="info-content">
      <div class="element-body" style="padding: 0">
        <interactive-map></interactive-map>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
