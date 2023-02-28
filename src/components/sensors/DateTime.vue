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
    if (props.data[i].sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
watchEffect(() => {
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
</script>
<template>
  <div v-if="isType === 'basic'" class="date-time-container">
    <default-sensor :id="'therm_' + id" :default-data="dataNow" />
  </div>
</template>
<style scoped>
.date-time-container {
  width: 100%;
  height: 100%;
}
</style>
