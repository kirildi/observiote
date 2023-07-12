<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";
  import DefaultSensor from "./DefaultSensor.vue";

  const props = defineProps<{
    id: number | string;

    type: string;
    data: SensorDataValue[];
  }>();
  const isType = ref("basic");
  const dataNow: Ref<SensorDataValue[]> = ref([]);
  let batteryLevelElement = ref<HTMLElement | null>(null);

  const minScale = 0;
  const maxScale = 12;
  const maxValue = 100;

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }
  function convertDataToScale(dataInput: number): number {
    if (dataInput === 0) return 0;

    return (dataInput * maxScale) / maxValue;
  }
  function batteryLevelFill() {
    if (!batteryLevelElement.value) return;
    if (dataNow.value[0].now === undefined) return;

    const convertedScale = convertDataToScale(dataNow.value[0].now).toString();
    batteryLevelElement.value.style.width = `${convertedScale}rem`;
  }

  onMounted(() => {
    batteryLevelElement.value = document.querySelector(".battery__level");
    batteryLevelFill();
  });
  watchEffect(() => {
    isType.value = props.type;
    dataNow.value = verifySensorData(props.data);
    batteryLevelFill();
  });
</script>
<template>
  <div v-if="isType === 'basic'" class="battery__container w-full h-full">
    <default-sensor :id="'basic_' + id" :default-data="`${dataNow[0]?.now ?? 0}`" />
  </div>
  <div v-else class="battery__container w-full h-full">
    <div class="container relative flex flex-row justify-center items-center">
      <div class="outer w-60 h-24 p-2 border-solid border-2 rounded-xl border-white"></div>
      <div id="battery-level" class="battery__level absolute left-3 h-20 rounded-xl bg-lime-600"></div>
      <div class="battery__value absolute top-8 w-56 h-auto flex justify-center text-2xl">{{ dataNow[0]?.now ?? 0 }}%</div>

      <div class="battery__cathode rounded-2xl m-2 w-2 h-8 bg-white"></div>
    </div>
  </div>
</template>

<style scoped></style>
