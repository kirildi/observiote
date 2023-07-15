<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number | string;
    type?: string;
    data: SensorDataValue[];
  }>();

  const dataNow: Ref<SensorDataValue[]> = ref([]);
  let gaugeFill = ref<HTMLElement | null>(null);

  function updateGauge() {
    if (!gaugeFill.value) return;
    if (dataNow.value[0].now === undefined) return;

    const value = (dataNow.value[0].now * 0.5) / 100;
    gaugeFill.value.style.transform = `rotate(${value}deg)`;
  }

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }
  onMounted(() => {
    gaugeFill.value = document.querySelector(".humidity-gauge-fill");
  });
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);
    updateGauge();
  });
</script>
<template>
  <div class="humidity__gauge__body relative w-full pb-24 bg-neutral-600 overflow-hidden">
    <div class="humidity__gauge__fill absolute top-full left-0 w-full h-full bg-blue-600"></div>
    <div class="humidity__gauge__cover absolute flex w-3/4 h-full top-1/4 left-1/2 pb-36 justify-center items-center box-border">
      <div class="humidity__value absolute top-8 w-auto h-full mx-auto text-white text-xl">{{ dataNow[0]?.now ?? 0 }} %</div>
    </div>
  </div>
</template>

<style scoped>
  .humidity__gauge__body {
    border-top-left-radius: 100% 200%;
    border-top-right-radius: 100% 200%;
  }

  .humidity__gauge__cover {
    background: #353839;
    border-radius: 50%;
    transform: translateX(-50%);
  }
  .humidity__gauge__fill {
    transform-origin: center top;
    transform: rotate(0);
    transition: transform 0.2s ease-out;
  }
  .humidity-value {
    transition: all 1s ease-out;
  }
</style>
