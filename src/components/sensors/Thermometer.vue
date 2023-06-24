<script setup lang="ts">
  import { onMounted, ref, watchEffect } from "vue";
  import DefaultSensor from "./DefaultSensor.vue";
  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number;
    type: string;
    data: any[];
  }>();
  const isType = ref("basic");
  const dataNow = ref("");
  const degree = ref("\u{00B0}C");

  function extractSensorData(dataObj: any[]): any {
    const record = dataObj.filter((dataRecord) => {
      dataRecord.sensorId.sensorId === dataRecord.id;
    });

    if (!record.length) return 0;

    return record[0].sensorData;
  }

  onMounted(() => {
    isType.value = props.type;
    dataNow.value = extractSensorData(props.data);
  });
  watchEffect(() => {
    dataNow.value = extractSensorData(props.data);
  });
</script>
<template>
  <div v-if="isType === 'basic'" class="therm-container">
    <default-sensor :id="'therm_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="therm__container h-32">
    <div class="h-16 grid grid-rows-2 grid-flow-col justify-items-center gap-0">
      <span class="therm__value row-span-2">{{ dataNow }}{{ degree }}</span>
      <span class="therm__value col-span-1">max: <span class="text-red-300 text-center">0</span>{{ degree }}</span>
      <span class="therm__value col-span-1">min: <span class="text-cyan-300 text-center">0</span>{{ degree }}</span>
    </div>

    <div class="h-16 relative">
      <div class="therm__body w-full h-8 bg-gray-100 rounded-full"></div>
      <div class="therm__body__circle w-14 h-14 absolute bg-gray-100 rounded-full left-0 -top-3"></div>
      <div class="therm__cover w-8/12 h-6 bg-red-600 rounded-full absolute left-1 top-1"></div>
      <div class="therm__cover__circle w-12 h-12 absolute bg-red-600 rounded-full left-1 -top-2"></div>
    </div>
  </div>
</template>
<style scoped></style>
