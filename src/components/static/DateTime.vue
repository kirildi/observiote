<template>
  <div v-if="isType === 'basic'" class="date-time-container">
    <default-sensor :id="'therm_' + id" :therm-data="dataNow" />
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue"
import DefaultSensor from "./DefaultSensor.vue"

/* eslint-disable no-param-reassign */
export default {
  name: "DateTime",
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
        }
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
.date-time-container {
  width: 100%;
  height: 100%;
}
</style>
