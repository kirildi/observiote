<script setup lang="ts">
  import { onMounted, onUnmounted, inject, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import { useDeviceStore } from "../../stores/deviceStore";

  import RestClient from "../../rest/RestClient";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";
  import { NoDataStoredError } from "../../classes/NoDataStoredError";

  import InteractiveMap from "../../components/maps/InteractiveMap.vue";
  import SensorMenu from "../../components/buttons/SensorMenu.vue";
  import ButtonControl from "../../components/buttons/ButtonControl.vue";
  import SensorHistoryChart from "../../components/charts/SensorHistoryChart.vue";
  import Sensor from "../../components/Sensor.vue";
  import { DeviceInterface } from "../../interfaces/DeviceInterface";
  import { SensorInterface } from "../../interfaces/SensorInterface";
  import { emitterKey } from "../../globals/emitterKey";

  const props = defineProps<{
    id: number | string;
  }>();

  const emitter = inject(emitterKey);

  const globalAlertStore = useAlertsStore();
  const deviceStore = useDeviceStore();

  const restClient = new RestClient();

  const isInfoBoxShown = ref(false);
  const infoBoxData = ref<DeviceInterface[] | undefined[]>([]);
  const storageItem: string = "sensorList";

  let sensorList = ref<SensorInterface[]>([]);
  const sensorData = ref([] as any[]);
  const actuatorContent = ref({} as any);

  let updateSensorInterval: NodeJS.Timer;
  const waitToRequestPeriod = 19000; //in milliseconds

  function fetchSensors() {
    const getSensorsRequest: Promise<OIOTEResponseType> = restClient.updateSensors(props.id, storageItem);

    getSensorsRequest
      .then(() => {
        let storedSensors = sessionStorage.getItem(storageItem);
        if (!storedSensors) {
          throw new NoDataStoredError("No stored sensors data found");
        } else {
          sensorList.value = JSON.parse(storedSensors) as SensorInterface[];
          if (globalAlertStore.triggered) globalAlertStore.clearAlert();
        }
      })
      .catch((err: OIOTEResponseType) => {
        globalAlertStore.setError(err);
      });
  }

  onMounted(() => {
    emitter?.emit("updateInfoButton", true);
    if (!infoBoxData.value) infoBoxData.value = [];

    infoBoxData.value[0] = deviceStore.readByDeviceId(props.id.toString());

    window.document.title = infoBoxData?.value[0]?.deviceName ?? ""; // Updates page title

    document.querySelectorAll(".tabs")[0].innerHTML = infoBoxData?.value[0]?.deviceName ?? "title"; // Updates content header title

    fetchSensors();
  });

  watchEffect(() => {
    emitter?.on("infoButtonState", (e: boolean) => {
      isInfoBoxShown.value = e;
    });

    updateSensorInterval = setInterval(() => {
      fetchSensors();
    }, waitToRequestPeriod);
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
      <div v-if="infoBoxData[0]?.deviceImage === ''">
        <img :id="'device-img-' + infoBoxData[0].deviceId" src="http://" alt=" No image found" class="w-1/3 object-cover rounded-2xl" />
      </div>
      <div v-else>
        <img :id="'device-img-' + infoBoxData[0]?.deviceId" :src="infoBoxData[0]?.deviceImage" class="w-72 object-cover rounded-2xl" :alt="infoBoxData[0]?.deviceName" />
      </div>
      <div :id="'show-info-' + infoBoxData[0]?.deviceId" class="w-1/3">
        <ul>
          <li>ID: {{ infoBoxData[0]?.deviceId }}</li>
          <li>Date created: {{ infoBoxData[0]?.deviceCreateDate }}</li>
          <li>Date modified:{{ infoBoxData[0]?.deviceLastModifyDate }}</li>
          <li>Coordinates: {{ infoBoxData[0]?.deviceCoordinates }}</li>
        </ul>
      </div>
      <div class="break-normal w-1/3">Description: {{ infoBoxData[0]?.deviceDescription }}</div>
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
        <div v-for="sensor in sensorList" :key="sensor.sensorId" class="sensor__cell h-44 p-4 bg-zinc-700 rounded-xl">
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
      <div v-else class="controllers__area">
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
