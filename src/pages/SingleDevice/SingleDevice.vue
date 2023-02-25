<script setup lang="ts">
import { onMounted, onUnmounted, onBeforeMount, ref, watchEffect, inject } from "vue";

import Cookies from "js-cookie";
import { HTTP } from "../../components/httpObject";
import InteractiveMap from "../../components/interactive/InteractiveMap.vue";
import SensorMenu from "../../components/interactive/SensorMenu.vue";
import ButtonControl from "../../components/interactive/ButtonControl.vue";
import SensorHistoryChart from "../../components/interactive/SensorHistoryChart.vue";
import Sensor from "../../components/Sensor.vue";

const props = defineProps<{
  id: number;
}>();

function createHttpBody(devId: any) {
  return {
    authValue: "c373e03679e0d1a79a946b0ed81690b8366ea9f037c569506303aed56a0cbebb",
    deviceId: devId,
  };
}

const emitter = inject<string>("emitter");

const isInfoShown = ref(false);

const deviceList = ref([] as Array<any>);
const deviceContent = ref([] as any[]);
const dataForInfo = ref({} as any);
const sensorData = ref({} as any);
const actuatorContent = ref({} as any);

let authToken: string | undefined = "";
let sensorList: any = null;
let fetchSensorInterval: NodeJS.Timer;
let updateSensorInterval: NodeJS.Timer;

async function fetchSensors(devId: any) {
  const requestBody = createHttpBody(devId);

  const sensorRequest = await HTTP.post("/iotpp/rest/sensor_service", requestBody, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  sessionStorage.setItem("sensorList", JSON.stringify(sensorRequest.data));
}

async function updateSensors(devId: any) {
  const body = {
    deviceId: devId,
  };
  const sensorGetData = HTTP.post("/iotpp/rest/sensor_service/sensor_value", body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  // clears array for the new data
  sensorGetData.then((response) => {
    const respData = response.data;
    sensorData.value = [];
    for (let i = 0; i < deviceContent.value.length; i += 1) {
      sensorData.value.push({
        sensorId: respData[i].sensorId,
        sensorData: respData[i].constructedDataPacketValue,
      });
    }
  });
}

onBeforeMount(() => {
  // Fetching the device list from session, used for info box.
  deviceList.value = JSON.parse(sessionStorage.getItem("deviceList") as string);

  for (let index = 0; index < deviceList.value.length; index += 1) {
    console.log(typeof deviceList.value[index].deviceId, typeof props.id, "props id", props.id);
    if (deviceList.value[index].deviceId === props.id) {
      dataForInfo.value = deviceList.value[index];
      break;
    }
  }
});
onMounted(() => {
  authToken = Cookies.get("token");
  emitter.emit("updateInfoButton", true);

  window.document.title = dataForInfo.value.deviceName; // Updates page title

  document.querySelectorAll(".tabs")[0].innerHTML = dataForInfo.value.deviceName; // Updates content header title

  if (sensorList) {
    deviceContent.value = JSON.parse(sensorList);
  } else {
    const fetchResult = fetchSensors(props.id);
    fetchResult
      .then(() => {
        sensorList = sessionStorage.getItem("sensorList");
        deviceContent.value = JSON.parse(sensorList);
        //   store.dispatch("alertStore/removeError"); // Removes error on success, if any.
      })
      .catch((e) => {
        //   store.dispatch("alertStore/setError", {
        //     type: "ERROR",
        //     code: e.response.status,
        //     message: e.response.statusText,
        //   });
      });
  }
  updateSensors(props.id);
});

watchEffect(() => {
  emitter.on("infoButton", (e: any) => {
    isInfoShown.value = e;
  });

  const requestTime = 19000;
  fetchSensorInterval = setInterval(() => {
    const res = fetchSensors(props.id);
    res
      .then(() => {
        sensorList = sessionStorage.getItem("sensorList");
        deviceContent.value = JSON.parse(sessionStorage.getItem("sensorList") as string);
        //   store.dispatch("alertStore/removeError");
      })
      .catch((e) => {
        //   store.dispatch("alertStore/setError", {
        //     type: "ERROR",
        //     code: e.response.status,
        //     message: e.response.statusText,
        //   });
      });
  }, requestTime);

  updateSensorInterval = setInterval(() => {
    updateSensors(props.id);
  }, 20000);
});
// When you leave Sensor page
onUnmounted(() => {
  clearInterval(fetchSensorInterval);
  clearInterval(updateSensorInterval);
  actuatorContent.value = {};
  emitter.emit("updateInfoButton", false);
});
</script>
<template>
  <!-- DEVICE INFO -->
  <div v-show="isInfoShown" class="info__container">
    <button class="fa fa-close info__close" @click="isInfoShown = false">Close</button>
    <div class="info__content">
      <div v-if="dataForInfo.deviceImage === ''">
        <img :id="'device-img-' + dataForInfo.deviceId" src="http://" alt=" No image found" class="w3-show w3-image" />
      </div>
      <div v-else>
        <img :id="'device-img-' + dataForInfo.deviceId" :src="dataForInfo.deviceImage" class="w3-show w3-image" :alt="dataForInfo.deviceName" />
      </div>
      <div :id="'show-info-' + dataForInfo.deviceId">
        <ul>
          <li>ID: {{ dataForInfo.deviceId }}</li>
          <li>Date created: {{ dataForInfo.deviceCreateDate }}</li>
          <li>Date modified:{{ dataForInfo.deviceLastModifyDate }}</li>
          <li>Coordinates: {{ dataForInfo.deviceCoordinates }}</li>
        </ul>
      </div>
      <div class="w3-small text-wrap">Description: {{ dataForInfo.deviceDescription }}</div>
    </div>
  </div>

  <!-- SENSORS -->
  <div class="single__device container relative p-8">
    <div class="grid grid-cols-3 grid-rows-2 grid-flow-col gap-8 h-full">
      <div v-if="!deviceContent || deviceContent.length === 0" class="p-4">
        <p>Device does't have sensors at this moment.</p>
        <p>NOTICE: Device content is updated automaticaly.</p>
      </div>
      <div v-else class="sensors__area row-span-2 col-span-2 col-start-1 flex flex-row flex-wrap gap-8 basis-60">
        <div v-for="sensor in deviceContent" :key="sensor.sensorId" class="sensor__cell p-4 bg-zinc-700 rounded-xl">
          <div class="sensor__header w-60 h-8 flex flex-row flex-auto place-content-between">
            <span class=" ">
              {{ sensor.sensorTypeId.sensorTypeName }}
            </span>
            <div class="">
              <span class="pl-4">
                <sensor-history-chart :chart-id="'history-chart-' + sensor.sensorId" :label-name="sensor.sensorTypeId.sensorTypeName" :sensor-id="sensor.sensorId" :dev-id="id" />
              </span>
              <span class="pl-4">
                <sensor-menu :sensor-id="parseInt(sensor.sensorId, 10)" :sensor-type="sensor.sensorTypeId" />
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
          <button-control :id="props.id" name="button" />
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
</style>
