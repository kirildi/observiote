<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import DefaultSensor from "./DefaultSensor.vue";

const props = defineProps<{
  id: number;
  type: string;
  data: any[];
}>();
const isType = ref("basic");
const dataNow = ref("");

onMounted(() => {
  isType.value = props.type;
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
watchEffect(() => {
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
</script>

<template>
  <div v-if="isType === 'basic'" class="air-pressure-container">
    <default-sensor :id="'therm_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="air-pressure-container">
    <div class="pressure-gauge-body"></div>
    {{ dataNow }}
  </div>
</template>

<style scoped>
.air-pressure-container {
  width: 100%;
  height: 100%;
}

.pressure-gauge-body {
  position: relative;
  margin: auto 1em;
  width: 100%;
  background: red;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
</style>
