<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";
  import colors from "tailwindcss/colors";

  import DefaultSensor from "./DefaultSensor.vue";

  const props = defineProps<{
    id: number | string;
    type: string;
    data: SensorDataValue[];
  }>();
  const isType = ref("basic");
  const dataNow: Ref<SensorDataValue[]> = ref([]);
  const c = ref<HTMLElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;

  function drawScale(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    ctx_.lineWidth = 2;
    ctx_.strokeStyle = "palegreen";
    ctx_.beginPath();
    ctx_.moveTo(36, 50);
    ctx_.lineTo(12, 36);
    ctx_.bezierCurveTo(80, 6, 160, 6, 226, 36);
    ctx_.lineTo(208, 50);
    ctx_.stroke();
  }

  function drawCover(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    ctx_.fillStyle = "dimgray";
    ctx_.beginPath();
    ctx_.moveTo(80, 98);
    ctx_.bezierCurveTo(100, 72, 140, 72, 160, 98);
    ctx_.fill();
  }

  function drawPointer(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    ctx_.lineWidth = 3;
    ctx_.strokeStyle = "tomato";
    ctx_.beginPath();
    ctx_.moveTo(120, 96);
    ctx_.lineTo(14, 38);
    ctx_.stroke();
  }

  function drawBackground(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    const grad = ctx_.createLinearGradient(0, 80, 0, 0);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(1, "dimgrey");
    ctx_.fillStyle = grad;
    ctx_.fillRect(0, 0, 240, 100);
  }

  function updatePointer(dataValue: number) {}
  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }

  onMounted(() => {
    c.value = document.getElementById("barometer__" + props.id);
    if (c.value instanceof HTMLCanvasElement) {
      ctx = c.value.getContext("2d");

      if (ctx) {
        drawBackground(ctx);
        drawScale(ctx);
        drawPointer(ctx);
        drawCover(ctx);
      }
    }
  });
  watchEffect(() => {
    isType.value = props.type;
    dataNow.value = verifySensorData(props.data);

    updatePointer(dataNow.value[0].now ?? 90);
  });
</script>

<template>
  <div v-if="isType === 'basic'" class="air__pressure__container max-w-xs">
    <default-sensor :id="'therm_' + id" :default-data="`${dataNow[0]?.now ?? 0}`" />
  </div>
  <div v-else class="air__pressure__container max-w-xs">
    <div class="gauge__container relative w-full flex justify-center items-center">
      <canvas :id="`barometer__${id}`" width="240" height="100"></canvas>
    </div>
  </div>
</template>

<style scoped></style>
