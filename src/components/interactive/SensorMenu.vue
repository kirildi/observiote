<script setup lang="ts">
import { ref } from "vue";
import ButtonControl from "./ButtonControl.vue";
import Slider from "./Slider.vue";

const props = defineProps<{
  sensorId?: string | number;
  //devId: number;
  sensorType: any;
}>();

const isSensorMenuVisible = ref(false);
const isPropertiesMenuVisible = ref(false);
</script>
<template>
  <button class="fa fa-cog settings-button" @click="isSensorMenuVisible = true"></button>
  <div v-show="isSensorMenuVisible" :id="sensorId as string" class="sensor-menu-wrapper">
    <div class="chart-main">
      <div class="sensor-menu-header">
        <button class="fa fa-close close-settings" style="padding: 0.5rem; background-color: #303030; border-radius: 0.6rem" @click="isSensorMenuVisible = false"></button>
        <span class="w3-center">Settings - {{ sensorType.sensorTypeName }}</span>
      </div>

      <div class="sensor-menu-body">
        <!--SENSOR ACTUATORS-->
        <div class="controlers-content">
          <button-control name="button" />
          <slider name="slider" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sensor-menu-wrapper {
  width: 90%;
  height: 80%;
  position: fixed;
  top: 1em;
  left: 0;
  margin: 5% 5%;
  background-color: #1c1c1c;
  z-index: 1004;
  border-radius: 0.6em;
}

.settings-button,
.close-settings,
.chart-settings-menu {
  color: #f4efde;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.sensor-menu-header {
  width: 100%;
  height: 3rem;
  padding: 0.5em;
  text-align: center;
}

.chart-main {
  width: 92%;
}

.select-range {
  width: 100%;
}

.sensor-menu-body {
  width: 100%;
  height: 98%;
}

.controlers-content {
  display: flex;
  width: 100%;
  height: 70%;
  padding: 1em;
  gap: 1em 1em;
  place-items: stretch stretch;
}
</style>
