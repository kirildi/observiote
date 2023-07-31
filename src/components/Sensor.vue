<script setup lang="ts">
  import { ref, watchEffect } from "vue";

  import { SensorDataValue } from "../types/SensorDataType";
  import { SensorInterface } from "../interfaces/SensorInterface";
  import DefaultSensor from "./sensors/DefaultSensor.vue";
  import AirPressure from "./sensors/AirPressure.vue";
  import Barometer from "./sensors/Barometer.vue";
  import BatteryLevel from "./sensors/BatteryLevel.vue";
  import DateTime from "./sensors/DateTime.vue";
  import Humidity from "./sensors/Humidity.vue";
  import Rain from "./sensors/Rain.vue";
  import SunLight from "./sensors/SunLight.vue";
  import Thermometer from "./sensors/Thermometer.vue";
  import WaterLevel from "./sensors/WaterLevel.vue";

  const props = defineProps<{
    id: string;
    content?: SensorInterface;
    data: SensorDataValue[];
  }>();

  const isType = ref("");

  watchEffect(() => {
    isType.value = props.content?.sensorTypeId.sensorStyle ?? "advanced";
  });
</script>

<template>
  <div v-if="isType === 'basic'" class="max-w-xs p-4">
    <default-sensor :id="'basic_' + id" :data="data" />
  </div>
  <div v-else class="max-w-xs p-4">
    <air-pressure v-if="content?.sensorTypeId.sensorTypeName === 'AirPressure'" :id="content.sensorId" type="advanced" :data="data" />
    <barometer v-if="content?.sensorTypeId.sensorTypeName === 'Barometer'" :id="content.sensorId" type="advanced" :data="data" />
    <battery-level v-if="content?.sensorTypeId.sensorTypeName === 'BatteryLevel'" :id="content.sensorId" type="advanced" :data="data" />
    <date-time v-if="content?.sensorTypeId.sensorTypeName === 'DateTime'" :id="content.sensorId" type="basic" :data="data" />
    <humidity v-if="content?.sensorTypeId.sensorTypeName === 'Humidity'" :id="content.sensorId" type="advanced" :data="data" />
    <rain v-if="content?.sensorTypeId.sensorTypeName === 'Rain'" :id="content.sensorId" type="advanced" :data="data" />
    <sun-light v-if="content?.sensorTypeId.sensorTypeName === 'SunLight'" :id="content.sensorId" type="advanced" :data="data" />
    <thermometer v-if="content?.sensorTypeId.sensorTypeName === 'Temperature'" :id="content.sensorId" type="advanced" :data="data" />
    <water-level v-if="content?.sensorTypeId.sensorTypeName === 'WaterLevel'" :id="content.sensorId" type="advanced" :data="data" />
  </div>
</template>

<style scoped></style>
