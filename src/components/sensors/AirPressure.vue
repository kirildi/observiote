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
  const minAirPressure = 0;
  const maxAirPressure = 1020; // theoretical max hPa value on Earth
  const minGaugeAngle = 0; // in degree
  const maxGaugeAngle = 180; // in degree

  function mapValueToDegree(airPressure: number, maxAirPressure: number, minAirPressure: number, maxGaugeAngle: number, minGaugeAngle: number): number {
    return ((airPressure - minAirPressure) * (maxGaugeAngle - minGaugeAngle)) / (maxAirPressure - minAirPressure) + minGaugeAngle;
  }
  function updateGauge(): void {
    if (!gaugeFill.value) return;
    if (dataNow.value[0].now === undefined) return;

    const value = mapValueToDegree(dataNow.value[0].now, maxAirPressure, minAirPressure, maxGaugeAngle, minGaugeAngle);
    gaugeFill.value.style.transform = `rotate(${value}deg)`;
  }

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }

  onMounted(() => {
    gaugeFill.value = document.querySelector(".pressure__gauge__fill");
  });

  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);

    updateGauge();
  });
</script>
<template>
  <div class="air__pressure__container">
    <div class="pressure__gauge__body relative w-full pb-24 bg-gray-600 overflow-hidden">
      <div id="asd" class="pressure__gauge__fill absolute top-full left-0 w-full h-full bg-orange-600"></div>
      <div class="pressure__gauge__cover absolute flex w-3/4 h-full top-1/4 left-1/2 pb-36 justify-center items-center box-border">
        <div class="pressure__value absolute top-8 w-auto h-full mx-auto text-white text-xl">{{ dataNow[0]?.now ?? 0 }} bar</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .pressure__gauge__body {
    border-top-left-radius: 100% 200%;
    border-top-right-radius: 100% 200%;
  }

  .pressure__gauge__fill {
    transform-origin: center top;
    transform: rotate(0);
    transition: transform 0.2s ease-out;
  }
  .pressure__gauge__cover {
    background: #353839;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  .pressure-value {
    transition: all 1s ease-out;
  }
</style>
