<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import RestClient from "../../rest/RestClient";
  import InteractiveMap from "../../components/maps/InteractiveMap.vue";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";

  const globalAlertStore = useAlertsStore();
  const restClient = new RestClient();

  const devicesData = ref([] as any[]);
  let deviceList: string;
  const storageItem: string = "deviceList";
  let fetchDevicesInterval: NodeJS.Timer;
  const requestIntervalPeriod = 600000; //in milliseconds

  function toggleElementInfo(tempId: Number) {
    const dev: Element | null = document.querySelector(`.device-${tempId}-info-content`);
    dev?.classList.toggle("w3-hide");
  }

  onMounted(() => {
    const deviceRequest: Promise<OIOTEResponseType> = restClient.fetchDevices(storageItem);

    deviceRequest
      .then((res) => {
        deviceList = sessionStorage.getItem(storageItem) ?? "";
        if (!deviceList) {
          devicesData.value = [];
          throw { status: "000", statusText: "No stored device data found" };
        }
        devicesData.value = JSON.parse(deviceList);

        if (globalAlertStore.triggered) globalAlertStore.removeError();
      })
      .catch((err) => {
        globalAlertStore.setError({ alertType: "ERROR", alertCode: err.status, alertMessage: err.statusText });
      });
  });
  watchEffect(() => {
    fetchDevicesInterval = setInterval(() => {
      if (!deviceList) {
        const deviceRequest: Promise<OIOTEResponseType> = restClient.fetchDevices(storageItem);

        deviceRequest
          .then((res) => {
            deviceList = sessionStorage.getItem(storageItem) ?? "";
            devicesData.value = JSON.parse(deviceList);
            if (globalAlertStore.triggered) globalAlertStore.removeError();
          })
          .catch((err) => {
            globalAlertStore.setError({ alertType: "ERROR", alertCode: err.status, alertMessage: err.statusText });
          });
      }
    }, requestIntervalPeriod);
  });
  onUnmounted(() => {
    clearInterval(fetchDevicesInterval);
  });
</script>
<template>
  <div class="container relative p-4">
    <div v-if="!devicesData || devicesData.length === 0" class="device-content p-4">
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
                params: { device: device },
              }">
              <div v-if="device.deviceImage === ''">
                <img :id="'device-img-' + device.deviceId" src="http://" alt=" No image found" class="w-72 object-cover rounded-t-3xl opacity-80" />
              </div>
              <div v-else class=" ">
                <img :id="'device-img-' + device.deviceId" :src="device.deviceImage" class="w-72 object-cover rounded-t-3xl opacity-80" :alt="device.deviceName" />
              </div>

              <!--DEVICE NAME-->
              <div class="device-description p-4 overflow-ellipsis bg-zinc-700 rounded-b-xl">
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
      <div class="map__area col-start-3 col-span-1 row-span-1">
        <interactive-map />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
