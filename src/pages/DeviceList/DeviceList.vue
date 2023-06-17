<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import { useDeviceStore } from "../../stores/deviceStore";
  import RestClient from "../../rest/RestClient";
  import InteractiveMap from "../../components/maps/InteractiveMap.vue";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";

  const globalAlertStore = useAlertsStore();
  const deviceStore = useDeviceStore();

  const restClient = new RestClient();

  let deviceList = ref([] as any[]);
  const storageItem: string = "deviceList";
  let fetchDevicesInterval: NodeJS.Timer;
  const requestIntervalPeriod = 600000; //in milliseconds

  function toggleElementInfo(tempId: Number) {
    const dev: Element | null = document.querySelector(`.device-${tempId}-info-content`);
    dev?.classList.toggle("w3-hide");
  }

  function obtainDevices(): boolean {
    let runStatus = false;

    const deviceRequest: Promise<OIOTEResponseType> = restClient.fetchDevices(storageItem);
    deviceRequest
      .then((res) => {
        const storedDevices = sessionStorage.getItem(storageItem) ?? "";

        if (!storedDevices) {
          throw { status: "000", statusText: "No stored devices data found" };
        }
        deviceList.value = JSON.parse(storedDevices);
        deviceStore.updateStore(deviceList.value);

        if (globalAlertStore.triggered) globalAlertStore.removeError();
        runStatus = true;
      })
      .catch((err) => {
        globalAlertStore.setError({ alertType: "ERROR", alertCode: err.status, alertMessage: err.statusText });
        runStatus = false;
      });
    return runStatus;
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
