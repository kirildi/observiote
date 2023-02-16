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
  <div class="container relative p-4 pl-24">
    <div v-if="!devicesData" class="device-content p-4">
      <h3>Notice:</h3>
      <p>Devices, should be automatically displayed here. If you read this there should be an error or no connection to the server.</p>
    </div>
    <div v-else class="device-content p-4 grid grid-cols-3 grid-rows-2 grid-flow-col gap-4">
      <ul class="flex flex-auto flex-row gap-8 row=span-2">
        <li v-for="(device, index) in devicesData" :key="index" class="device-element container">
          <div class="w-72 h-64">
            <router-link
              :to="{
                name: 'device',
                params: { id: device.deviceId },
              }">
              <div v-if="device.deviceImage === ''">
                <img :id="'device-img-' + device.deviceId" src="http://" alt=" No image found" class="w-72 object-cover rounded-t-3xl opacity-80" />
              </div>
              <div v-else class=" ">
                <img :id="'device-img-' + device.deviceId" :src="device.deviceImage" class="w-72 object-cover rounded-t-3xl opacity-80" :alt="device.deviceName" />
              </div>

              <!--DEVICE NAME-->
              <div class="device-description p-4 overflow-ellipsis bg-zinc-700 rounded-b-2xl">
                {{ device.deviceName }}
              </div>
            </router-link>
            <!--TOGGLE INFO-->
            <div class="fa fa-chevron-down device-toggle-info hidden" aria-hidden="true" @click="toggleElementInfo(device.deviceId)"></div>
          </div>

          <!--INFO CONTENT-->
          <div :class="'device-' + device.deviceId + '-info-content hidden'">
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
      <div class="i-map col-start-3 col-span-1 row-span-1">
        <interactive-map></interactive-map>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
