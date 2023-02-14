<template>
  <air-pressure
    v-if="content.sensorTypeId.sensorTypeName === 'Air Pressure'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <barometer
    v-if="content.sensorTypeId.sensorTypeName === 'Barometer'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <battery-level
    v-if="content.sensorTypeId.sensorTypeName === 'Battery'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <date-time
    v-if="content.sensorTypeId.sensorTypeName === 'DateTime'"
    :id="content.sensorId"
    type="basic"
    :data="data"
  />
  <humidity
    v-if="content.sensorTypeId.sensorTypeName === 'Humidity'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <rain
    v-if="content.sensorTypeId.sensorTypeName === 'Rain'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <sun-light
    v-if="content.sensorTypeId.sensorTypeName === 'Sun Light'"
    :id="content.sensorId"
    type="basic"
    :data="data"
  />
  <thermometer
    v-if="content.sensorTypeId.sensorTypeName === 'Temperature'"
    :id="content.sensorId"
    type="advanced"
    :data="data"
  />
  <water-level
    v-if="content.sensorTypeId.sensorTypeName === 'WaterLevel'"
    :id="content.sensorId"
    type="basic"
    :data="data"
  />
</template>
<script>
import AirPressure from "../static/AirPressure.vue"
import Barometer from "../static/Barometer.vue"
import BatteryLevel from "../static/BatteryLevel.vue"
import DateTime from "../static/DateTime.vue"
import Humidity from "../static/Humidity.vue"
import Rain from "../static/Rain.vue"
import SunLight from "../static/SunLight.vue"
import Thermometer from "../static/Thermometer.vue"
import WaterLevel from "../static/WaterLevel.vue"

export default {
  name: "Device",
  components: {
    AirPressure,
    Barometer,
    BatteryLevel,
    DateTime,
    Humidity,
    Rain,
    SunLight,
    Thermometer,
    WaterLevel
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    content: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    return {}
  }
}
</script>

<style></style>
