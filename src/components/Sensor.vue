<script setup lang="ts">
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
  content?: any;
  data?: any;
}>();

// const props = defineProps <{
//   id: number;
//   content: [] as any[];
//   data: [] as any[];
// }>();
</script>

<template>
  <air-pressure v-if="content.sensorTypeId.sensorTypeName === 'Air Pressure'" :id="content.sensorId" type="advanced" :data="data" />
  <barometer v-if="content.sensorTypeId.sensorTypeName === 'Barometer'" :id="content.sensorId" type="advanced" :data="data" />
  <battery-level v-if="content.sensorTypeId.sensorTypeName === 'Battery'" :id="content.sensorId" type="advanced" :data="data" />
  <date-time v-if="content.sensorTypeId.sensorTypeName === 'DateTime'" :id="content.sensorId" type="basic" :data="data" />
  <humidity v-if="content.sensorTypeId.sensorTypeName === 'Humidity'" :id="content.sensorId" type="advanced" :data="data" />
  <rain v-if="content.sensorTypeId.sensorTypeName === 'Rain'" :id="content.sensorId" type="advanced" :data="data" />
  <sun-light v-if="content.sensorTypeId.sensorTypeName === 'Sun Light'" :id="content.sensorId" type="basic" :data="data" />
  <thermometer v-if="content.sensorTypeId.sensorTypeName === 'Temperature'" :id="content.sensorId" type="advanced" :data="data" />
  <water-level v-if="content.sensorTypeId.sensorTypeName === 'WaterLevel'" :id="content.sensorId" type="basic" :data="data" />
</template>

<style scoped></style>
