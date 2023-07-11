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
  let rainLevelElement = ref<HTMLElement | null>(null);

  const minScale = 0;
  const maxScale = 5;

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }
  function convertDataToScale(dataInput: number): number {
    if (dataInput === 0) return 0;
    if (dataInput < maxScale) return dataInput;

    return maxScale;
  }
  function rainLevelFill() {
    if (!rainLevelElement.value) return;
    if (dataNow.value[0].now === undefined) return;

    const convertedScale = convertDataToScale(dataNow.value[0].now).toString();

    rainLevelElement.value.style.height = `${convertedScale}em`;
  }
  onMounted(() => {
    rainLevelElement.value = document.querySelector(".level");
    rainLevelFill();
  });

  watchEffect(() => {
    isType.value = props.type;
    dataNow.value = verifySensorData(props.data);
    rainLevelFill();
  });
</script>
<template>
  <div v-if="isType === 'basic'" class="rain__container">
    <default-sensor :id="'basic_' + id" :default-data="`${dataNow[0]?.now ?? 0}`" />
  </div>
  <div v-else class="rain__container w-full h-full">
    <div class="relative flex flex-row justify-center items-center">
      <div class="outer w-60 h-24 p-2 mt-1 rounded-b-2xl border-solid border-2 border-t-0 border-x-white"></div>
      <div id="rain-level" class="level absolute bottom-2 w-56 bg-blue-600 rounded-b-2xl"></div>
      <div class="rain__value absolute top-8 w-56 h-auto flex justify-center text-2xl">{{ dataNow[0]?.now ?? 0 }} mm</div>
    </div>
  </div>
</template>

<style scoped></style>
