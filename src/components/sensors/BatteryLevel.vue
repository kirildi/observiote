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
  <div v-if="isType === 'basic'" class="battery-container">
    <default-sensor :id="'basic_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="battery-container">
    <div class="container">
      <div class="outer">
        <div class="battery-value">50%</div>
        <div id="battery-level" class="level"></div>
      </div>
      <div class="battery-plus"></div>
    </div>
  </div>
</template>

<style scoped>
.battery-container {
  width: 100%;
  height: 100%;
  padding: 1em;
}
.container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.outer {
  border-radius: 1em;
  border: 3px solid #f4efde;
  padding: 3px;
  width: 200px;
  height: 100%;
}

.battery-plus {
  border-radius: 1em;
  background-color: #f4efde;
  margin: 5px;
  width: 8px;
  height: 50px;
}

.level {
  border-radius: 0.6em;
  background-color: #669b1b;
  height: 90px;
}

.battery-value {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  font-size: 1.4em;
  top: 36%;
}
</style>
