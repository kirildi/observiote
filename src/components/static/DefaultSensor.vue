<template>
  <div v-if="isDataType !== 'number'" class="therm-basic">
    <div class="therm-value">
      <span class="w3-col s9 l9">{{ thermData }}</span>
      <!--<span class="w3-col s3 l3" style="margin-left: 0,5em"> {{ degree }}</span>-->
    </div>
    <canvas :id="id" class="therm-chart"></canvas>
  </div>
  <div v-else class="therm-basic">
    <div class="therm-value">
      <span class="w3-col s9 l9">{{ thermData }}</span>
      <!--<span class="w3-col s3 l3" style="margin-left: 0,5em"> {{ degree }}</span>-->
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue"

export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    thermData: {
      type: String,
      default: ""
    }
  },
  setup() {
    const degree = ref("\u{00B0}C")
    const isDataType = ref(true)

    onMounted(() => {})
    watchEffect(() => {})

    return {
      isDataType,
      degree
    }
  }
}
</script>

<style scoped>
.therm-basic {
  position: relative;
  width: 100%;
  height: 100%;
}
.therm-chart {
  width: 100% !important;
  height: 100% !important;
  opacity: 0.6;
}

.therm-value {
  position: absolute;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -54%);
  font-size: 2em;
  z-index: 1000;
}
</style>
