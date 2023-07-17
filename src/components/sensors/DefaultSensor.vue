<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number | string;
    data: SensorDataValue[];
  }>();

  const dataNow: Ref<SensorDataValue[]> = ref([]);
  const isDataType = ref(false);

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }

  onMounted(() => {});
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);
  });
</script>

<template>
  <div v-if="!isDataType" class="default__container relative w-full h-full flex-row justify-center items-center">
    <div class="therm__value absolute top-4 w-56 h-auto flex justify-center text-2xl">
      <span class="">{{ dataNow[0]?.now ?? 0 }}</span>
    </div>
  </div>
  <div v-else class="therm__basic h-20">
    <div class="therm__value flex items-center justify-center">
      <span class=" ">{{ dataNow[0]?.now ?? 0 }}</span>
      <!-- <canvas :id="id" class="therm-chart"></canvas> -->
      <!--<span class="w3-col s3 l3" style="margin-left: 0,5em"> {{ degree }}</span>-->
    </div>
  </div>
</template>

<style scoped>
  .therm-chart {
    width: 100% !important;
    height: 100% !important;
    opacity: 0.6;
  }
</style>
