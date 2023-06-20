<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import { useDeviceStore } from "../../stores/deviceStore";
  import { DeviceInterface } from "../../interfaces/DeviceInterface";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";
  import InteractiveMap from "../../components/maps/InteractiveMap.vue";

  const globalAlertStore = useAlertsStore();
  const deviceStore = useDeviceStore();

  let deviceList = ref([] as DeviceInterface[]);

  let fetchDevicesInterval: NodeJS.Timer;
  const requestIntervalPeriod = 600000; //in milliseconds

  function toggleElementInfo(tempId: number | string) {
    const dev: Element | null = document.querySelector(`.device-${tempId}-info-content`);
    dev?.classList.toggle("w3-hide");
  }

  async function obtainDevices(): Promise<boolean> {
    let deviceFetch: Promise<OIOTEResponseType> = deviceStore.fetch();

    return deviceFetch
      .then(() => {
        deviceList.value = deviceStore.deviceList;
        if (globalAlertStore.triggered) globalAlertStore.removeError();

        return Promise.resolve(true);
      })
      .catch((err: OIOTEResponseType) => {
        globalAlertStore.setError({ alertType: "ERROR", alertCode: err.status, alertMessage: err.statusText });
        return Promise.reject(false);
      });
  }

  onMounted(() => {
    if (!deviceList.value.length) obtainDevices();
  });
  watchEffect(() => {
    fetchDevicesInterval = setInterval(() => {
      obtainDevices();
    }, requestIntervalPeriod);
  });
  onUnmounted(() => {
    clearInterval(fetchDevicesInterval);
  });
</script>
<template>
  <div class="container relative p-4">
    <div v-if="!deviceList || deviceList.length === 0" class="device-content p-4">
      <h3>Notice:</h3>
      <p>Devices, should be automatically displayed here. If you read this there should be an error or no connection to the server.</p>
    </div>
    <div v-else class="device-content p-4 grid grid-cols-3 grid-rows-2 grid-flow-col gap-4">
      <ul class="flex flex-auto flex-row gap-4 row=span-2">
        <li v-for="(device, index) in deviceList" :key="index" class="device-element container">
          <div class="w-72 h-64">
            <router-link
              :to="{
                name: 'device',
                params: { id: device.deviceId },
              }">
              <div v-if="device.deviceImage === ''">
                <img :id="'device-img-' + device.deviceId" src="http://" alt=" No image found" class="w-72 h-52 object-cover rounded-t-xl p-4 bg-zinc-900 opacity-80" />
              </div>
              <div v-else class=" ">
                <img :id="'device-img-' + device.deviceId" :src="device.deviceImage" class="w-72 h-52 object-cover rounded-t-xl p-4 bg-zinc-900 opacity-80" :alt="`${device.deviceName}: Image link broken`" />
              </div>

              <!--DEVICE NAME-->
              <div class="device-description w-72 p-4 overflow-ellipsis bg-zinc-700 rounded-b-xl">
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
