<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";

  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number | string;
    type?: string;
    data: SensorDataValue[];
  }>();

  const dataNow: Ref<SensorDataValue[]> = ref([]);
  const degree = ref("\u{00B0}C");
  let tempLevelElement = ref<HTMLElement | null>(null);

  const defaultWidth = 6.5; // When temp is 0 or no temp value
  const minWidth = 0;
  const maxWidth = 12;

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }

  function convertDataToScale(dataInput: number): number {
    if (dataInput === 0) return defaultWidth;
    if (dataInput > maxWidth) return maxWidth;
    if (dataInput < minWidth) return minWidth;
    return dataInput;
  }
  function tempLevelFill() {
    if (!tempLevelElement.value) return;
    if (dataNow.value[0].now === undefined) return;

    const convertedScale = convertDataToScale(dataNow.value[0].now).toString();

    tempLevelElement.value.style.width = `${convertedScale}em`;
  }

  onMounted(() => {
    tempLevelElement.value = document.querySelector(".therm__cover");
    tempLevelFill();
  });
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);
    tempLevelFill();
  });
</script>
<template>
  <div class="therm__container h-24">
    <div class="therm__text h-12 grid grid-rows-2 grid-flow-col justify-items-center gap-0">
      <span class="therm__value row-span-2 text-3xl">{{ dataNow[0]?.now ?? 0 }} {{ degree }}</span>
      <span class="therm__value col-span-1">max: <span class="text-red-400 text-center">0</span>{{ degree }}</span>
      <span class="therm__value col-span-1">min: <span class="text-cyan-300 text-right">0</span>{{ degree }}</span>
    </div>

    <div class="therm__ui h-12 relative flex justify-center items-center">
      <div class="therm__body w-full h-5 bg-gray-100 rounded-full"></div>
      <div class="therm__body__circle w-9 h-9 absolute bg-gray-100 rounded-full left-0 top-2"></div>
      <div class="therm__cover h-2 bg-red-600 rounded-full absolute left-1 top-5"></div>
      <div class="therm__cover__circle w-7 h-7 absolute bg-red-600 rounded-full left-1 top-3"></div>
      <div class="therm__marker absolute w-1 h-8 border-2 border-solid border-red-500"></div>
    </div>
  </div>
</template>
<style scoped></style>
