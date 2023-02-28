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
  <div v-if="isType === 'basic'" class="rain-container">
    <default-sensor :id="'basic_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="rain-container">
    <div class="container">
      <div class="outer">
        <div class="rain-value">{{ dataNow }} mm</div>
        <div id="rain-level" class="level"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rain-container {
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
  border-radius: 0 0 1em 1em;
  border-top: 0 solid #000;
  border-bottom: 3px solid #f4efde;
  border-right: 3px solid #f4efde;
  border-left: 3px solid #f4efde;
  padding: 3px;
  width: 200px;
  height: 100%;
}

.level {
  border-radius: 0 0 0.6em 0.6em;
  background-color: #0c6680;
  height: 90px;
}

.rain-value {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  font-size: 1.4em;
  top: 36%;
}
</style>
