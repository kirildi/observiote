<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number | string;
    type?: string;
    data: SensorDataValue[];
  }>();
  const dataNow: Ref<SensorDataValue[]> = ref([]);
  const c = ref<HTMLElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  const X = 0;
  const Y = 0;
  const maxLevel = -81;

  function convertDataToScale(dataInput: number): number {
    if (dataInput === 0) return 0;
    if (-dataInput >= maxLevel) return -dataInput;

    return maxLevel;
  }
  function drawScale() {
    if (!ctx) return;

    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 1;
    for (let i = Y + 3; i < Y + 80; i += 10) {
      ctx.beginPath();
      ctx.moveTo(X + 190, i);
      ctx.lineTo(X + 212, i);
      ctx.closePath();
      ctx.stroke();
    }
  }
  function drawValue() {
    if (!ctx) return;
    ctx.save();
    ctx.font = "0.8em Arial";
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText("MAX: 0", 6, 18);
    ctx.fillText("MIN: 0", 6, 36);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,1.0)";
    ctx.font = "1.2em Arial";
    ctx.fillText(`NOW: ${dataNow.value[0].now}`, 6, 66);
    ctx.restore();
  }

  function drawLevel() {
    if (!ctx) return;
    const convertedScale = convertDataToScale(dataNow.value[0].now ?? 0);

    ctx.fillStyle = "rgba(220,180,10,.6)";
    ctx.beginPath();
    ctx.roundRect(0, 80, 220, convertedScale, [10]);
    ctx.fill();
  }

  function drawSunLightLevel() {
    drawLevel();
    drawScale();
    drawValue();
  }

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }
  onMounted(() => {
    c.value = document.getElementById(`sun__light__${props.id}`);
    if (c.value instanceof HTMLCanvasElement) {
      ctx = c.value.getContext("2d");

      if (ctx) {
        drawSunLightLevel();
      }
    }
  });
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);

    drawSunLightLevel();
  });
</script>
<template>
  <div class="sun__light__container relative flex flex-row justify-center items-center">
    <div class="outer w-60 h-24 p-2 rounded-2xl border-solid border-2 border-white">
      <canvas :id="`sun__light__${id}`"></canvas>
    </div>
  </div>
</template>

<style scoped>
  .therm-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
