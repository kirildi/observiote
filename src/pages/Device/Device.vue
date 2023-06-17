<script setup lang="ts">
  import { onMounted, onUnmounted, inject, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import { useDeviceStore } from "../../stores/deviceStore";

  import RestClient from "../../rest/RestClient";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";

  import InteractiveMap from "../../components/maps/InteractiveMap.vue";
  import SensorMenu from "../../components/buttons/SensorMenu.vue";
  import ButtonControl from "../../components/buttons/ButtonControl.vue";
  import SensorHistoryChart from "../../components/charts/SensorHistoryChart.vue";
  import Sensor from "../../components/Sensor.vue";
  import { emitterKey } from "../../globals/emitterKey";

  const props = defineProps<{
    id: number | string;
  }>();

  function createHttpBody(devId: any) {
    return {
      authValue: "c373e03679e0d1a79a946b0ed81690b8366ea9f037c569506303aed56a0cbebb",
      deviceId: devId,
    };
  }
  const emitter = inject(emitterKey);

  const globalAlertStore = useAlertsStore();
  const deviceStore = useDeviceStore();

  const restClient = new RestClient();

  const isInfoBoxShown = ref(false);
  const infoBoxData = ref({} as any);
  const storageItem: string = "sensorList";

  let sensorList = ref([] as any[]);
  const sensorData = ref([] as any[]);
  const actuatorContent = ref({} as any);

  let updateSensorInterval: NodeJS.Timer;
  const requestIntervalPeriod = 19000;

  function fetchSenorData() {
    const getSensorsRequest: Promise<OIOTEResponseType> = restClient.updateSensors(props.id, storageItem);

    getSensorsRequest
      .then(() => {
        let storedSensors = sessionStorage.getItem(storageItem);
        if (!storedSensors) {
          throw { status: "000", statusText: "No stored sensors data found" };
        } else {
          sensorList.value = JSON.parse(storedSensors);
          if (globalAlertStore.triggered) globalAlertStore.removeError();
        }
      })
      .catch((err) => {
        globalAlertStore.setError({ alertType: "ERROR", alertCode: err.status, alertMessage: err.statusText });
      });
  }

  onMounted(() => {
    emitter?.emit("updateInfoButton", true);

    infoBoxData.value = deviceStore.read(props.id.toString());

    window.document.title = infoBoxData.value.deviceName; // Updates page title

    document.querySelectorAll(".tabs")[0].innerHTML = infoBoxData.value.deviceName; // Updates content header title

    fetchSenorData();
  });

  watchEffect(() => {
    emitter?.on("infoButtonState", (e: boolean) => {
      isInfoBoxShown.value = e;
    });

    updateSensorInterval = setInterval(() => {
      fetchSenorData();
    }, requestIntervalPeriod);
  });
  // When you leave Sensor page
  onUnmounted(() => {
    clearInterval(updateSensorInterval);
    actuatorContent.value = {};
    emitter?.emit("updateInfoButton", false);
  });
</script>
<template>
  <!-- DEVICE INFO -->
  <div v-show="isInfoBoxShown" class="info__container absolute w-10/12 mt-4 p-8 bg-neutral-600 rounded-lg">
    <div class="flex justify-between">
      <span class="">Device info:</span>
      <button class="fa fa-close info__close mb-4 p-2" @click="isInfoBoxShown = false"><span class="px-4">Close</span></button>
    </div>
    <div class="info__content flex flex-auto gap-8 flex-row">
      <div v-if="infoBoxData.deviceImage === ''">
        <img :id="'device-img-' + infoBoxData.deviceId" src="http://" alt=" No image found" class="w-1/3 object-cover rounded-2xl" />
      </div>
      <div v-else>
        <img :id="'device-img-' + infoBoxData.deviceId" :src="infoBoxData.deviceImage" class="w-72 object-cover rounded-2xl" :alt="infoBoxData.deviceName" />
      </div>
      <div :id="'show-info-' + infoBoxData.deviceId" class="w-1/3">
        <ul>
          <li>ID: {{ infoBoxData.deviceId }}</li>
          <li>Date created: {{ infoBoxData.deviceCreateDate }}</li>
          <li>Date modified:{{ infoBoxData.deviceLastModifyDate }}</li>
          <li>Coordinates: {{ infoBoxData.deviceCoordinates }}</li>
        </ul>
      </div>
      <div class="break-normal w-1/3">Description: {{ infoBoxData.deviceDescription }}</div>
    </div>
  </div>

  <!-- SENSORS -->
  <div class="single__device container relative p-8">
    <div class="grid grid-cols-3 grid-rows-2 grid-flow-col gap-8 h-full">
      <div v-if="!sensorList || sensorList.length === 0" class="p-4">
        <p>Device does't have sensors at this moment.</p>
        <p>NOTICE: Device content is updated automatically.</p>
      </div>
      <div v-else class="sensors__area row-span-2 col-span-2 col-start-1 flex flex-row flex-wrap gap-8 basis-60">
        <div v-for="sensor in sensorList" :key="sensor.sensorId" class="sensor__cell h-40 p-4 bg-zinc-700 rounded-xl">
          <div class="sensor__header w-60 h-8 flex flex-row flex-auto place-content-between">
            <span class=" ">
              {{ sensor.sensorTypeId.sensorTypeName }}
            </span>
            <div class="">
              <span class="pl-4">
                <sensor-history-chart :chart-id="'history-chart-' + sensor.sensorId" :label-name="sensor.sensorTypeId.sensorTypeName" :sensor-id="JSON.stringify(sensor.sensorId)" :dev-id="id" />
              </span>
              <span class="pl-4">
                <sensor-menu :sensor-id="sensor.sensorId" :sensor-type="sensor.sensorTypeId" />
              </span>
            </div>
          </div>

          <div class="sensor__body w-60 h-32">
            <!-- SENSOR -->
            <sensor :id="'sensor_' + sensor.sensorId" :content="sensor" :data="sensorData" />
          </div>
        </div>
      </div>

      <!--MAP/CHART-->
      <div class="map__area col-start-3 col-span-1 row-span-1">
        <interactive-map />
      </div>

      <!--DEVICE CONTROLLERS-->
      <div v-if="!actuatorContent || actuatorContent.length === 0" class="controllers__area">
        <p>Device does't have actuators at this moment.</p>
      </div>
      <div v-else class="controllers__area col-start-3 col-span-1 row-span-1">
        <div class="actuators-content">
          <button-control :id="`${id}-actuator-button`" name="button" />
          <!-- <slider name="slider" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .controllers__area {
    @apply col-start-3 col-span-1 row-span-2;
  }

  .info__container {
    z-index: 1001;
  }
</style>
