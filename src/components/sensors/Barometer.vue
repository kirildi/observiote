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

  const minAirPressure = 600;
  const maxAirPressure = 1100;

  const pointerMinX = 14;
  const pointerMaxX = 222;

  function drawScale(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    ctx_.lineWidth = 3;
    ctx_.strokeStyle = "palegreen";
    ctx_.beginPath();
    ctx_.moveTo(36, 50);
    ctx_.lineTo(12, 36);
    ctx_.bezierCurveTo(80, 6, 160, 6, 226, 36);
    ctx_.lineTo(202, 49);
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

  function drawPointer(ctx_: CanvasRenderingContext2D | null, dataValue?: number) {
    if (!ctx_) return;

    let dataValueTemporary = minAirPressure;
    if (dataValue) dataValueTemporary = dataValue;

    const pointerXCalculated = convertDataToScale(dataValueTemporary, pointerMinX, pointerMaxX);

    ctx_.lineWidth = 3;
    ctx_.strokeStyle = "tomato";
    ctx_.beginPath();
    ctx_.moveTo(120, 96);
    ctx_.lineTo(pointerXCalculated, 38);
    ctx_.stroke();
  }

  function drawValue(ctx_: CanvasRenderingContext2D | null, dataValue?: number) {
    if (!ctx_) return;

    let dataValueString = 0;
    if (dataValue !== undefined) dataValueString = dataValue;

    ctx_.fillStyle = "darkgray";
    ctx_.textAlign = "center";
    ctx_.font = "1.5rem sans-serif ";
    ctx_.fillText(`${dataValueString} bar`, 120, 60);
  }

  function drawBackground(ctx_: CanvasRenderingContext2D | null) {
    if (!ctx_) return;
    const grad = ctx_.createLinearGradient(0, 80, 0, 0);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(1, "dimgrey");
    ctx_.fillStyle = grad;
    ctx_.fillRect(0, 0, 240, 100);
  }

  function updatePointer(dataValue: number) {
    drawPointer(ctx, dataValue);
    drawValue(ctx, dataValue);
  }
  function convertDataToScale(dataValue: number, pointerMinX: number, pointerMaxX: number): number {
    return ((dataValue - minAirPressure) * (pointerMaxX - pointerMinX)) / (maxAirPressure - minAirPressure) + pointerMinX;
  }

  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0 }];
    return dataObj;
  }

  onMounted(() => {
    c.value = document.getElementById("barometer__" + props.id);
    if (c.value instanceof HTMLCanvasElement) {
      ctx = c.value.getContext("2d");

      if (ctx) {
        // drawBackground(ctx);
        drawScale(ctx);
        drawPointer(ctx);
        drawCover(ctx);
        drawValue(ctx);
      }
    }
  });
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);

    updatePointer(dataNow.value[0].now ?? minAirPressure);
  });
</script>

<template>
  <div class="gauge__container relative w-full flex justify-center items-center">
    <canvas :id="`barometer__${id}`" width="240" height="100"></canvas>
  </div>
</template>

<style scoped></style>
