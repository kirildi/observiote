<template>
  <div v-if="isType === 'basic'" class="air-pressure-container">
    <default-sensor :id="'therm_' + id" :therm-data="dataNow" />
  </div>
  <div v-else class="air-pressure-container">
    <div class="pressure-gauge-body"></div>
    {{ dataNow }}
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue"
import DefaultSensor from "./DefaultSensor.vue"

/* eslint-disable no-param-reassign */
export default {
  name: "Thermometer",
  components: { DefaultSensor },
  props: {
    id: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "basic"
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const isType = ref("basic")
    const dataNow = ref("")

    onMounted(() => {
      isType.value = props.type
      for (let i = 0; i < props.data; i += 1) {
        if (props.data[i].sensorId === props.id) {
          dataNow.value = props.data[i].sensorData
          break
        }
      }
    })
    watchEffect(() => {
      for (let i = 0; i < props.data.length; i += 1) {
        if (props.data[i].sensorId === props.id) {
          dataNow.value = props.data[i].sensorData
          break
        }
      }
      if (isType.value === "advanced") {
        console.log("advanced")
      }
    })

    return {
      isType,
      dataNow
    }
  }
}
</script>

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
