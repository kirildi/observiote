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
const degree = ref("\u{00B0}C");

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
  <div v-if="isType === 'basic'" class="therm-container">
    <default-sensor :id="'therm_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="therm-container">
    <div class="therm-body"></div>
    <div class="therm-body-circle"></div>
    <div class="therm-cover"></div>
    <div class="therm-cover-circle"></div>
    <div>
      <span class="therm-value" style="left: 60%; top: 10%">max: <span style="color: #ffb4b4">0</span>{{ degree }}</span>
      <span class="therm-value" style="left: 15%; top: 20%">{{ dataNow }}{{ degree }}</span>
      <span class="therm-value" style="left: 60%; bottom: 10%">min: <span style="color: #7ed9f3">0</span>{{ degree }}</span>
    </div>
  </div>
</template>
<style scoped>
.therm-container {
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
}
.therm-body {
  height: 90%;
  width: 5%;
  background-color: #f4efde;
  border-radius: 10em;
}

.therm-body-circle {
  width: 11%;
  height: 20%;
  position: absolute;
  background-color: #f4efde;
  border-radius: 50%;
  bottom: 16px;
}
.therm-cover {
  height: 70%;
  width: 3%;
  background-color: #ff1c1c;
  border-radius: 10em;
  position: absolute;
  margin-top: 1%;
}

.therm-cover-circle {
  width: 10%;
  height: 18%;
  position: absolute;
  background-color: #ff1c1c;
  border-radius: 50%;
  bottom: 18px;
}
.therm-value {
  position: absolute;
}
</style>
