<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import DefaultSensor from "./DefaultSensor.vue";

const props = defineProps<{
  id: number;
  type: string;
  data: any[];
}>();
const isType = ref("basic");
const dataNow = ref("");
let c: HTMLElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
const X = 0;
const Y = 0;

function drawScale() {
  if (ctx) {
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.lineWidth = 1;
    for (let i = Y + 40; i < Y + 190; i += 10) {
      if (i === 110) {
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.strokeStyle = "rgba(127,27,27,1)";
        ctx.fillText("0", 6, i - 5);
        ctx.beginPath();
        ctx.moveTo(X + 6, i);
        ctx.lineTo(X + 32, i);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        i = 120;
      }
      ctx.beginPath();
      ctx.moveTo(X + 18, i);
      ctx.lineTo(X + 32, i);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function drawValue(value: any, posX: number, posY: number, styleColor: string) {
  if (ctx) {
    ctx.font = "12px Arial";
    ctx.fillStyle = "rgba(255,255,255,1)";

    setInterval(() => {
      if (ctx) {
        if (value > 9900) value = -9900;
        ctx.save();
        ctx.fillStyle = styleColor;
        ctx.clearRect(posX, posY - 12, 52, 14);
        ctx.fillRect(posX, posY - 12, 52, 14);
        ctx.restore();
        ctx.fillText(value, posX, posY);
      }
    }, 1000);
  }
}

function drawBody() {
  if (ctx) {
    ctx.fillStyle = "rgba(27,27,27,1.0)";
    ctx.fillRect(X, Y, ctx.canvas.width, ctx.canvas.height);
    drawScale();
    ctx.save();
    // Thermommeter top cap
    ctx.strokeStyle = "rgba(255,255,255,1.0)";
    ctx.beginPath();
    ctx.arc(X + 50, Y + 30, 12, 0, Math.PI, true);
    ctx.stroke();
    // Thermommeter sides
    ctx.beginPath();
    ctx.arc(X + 50, Y + 220, 30, Math.PI * -0.36, Math.PI * 1.36, false);
    ctx.moveTo(X + 38, Y + 193);
    ctx.lineTo(X + 38, Y + 30);
    ctx.moveTo(X + 62, Y + 30);
    ctx.lineTo(X + 62, Y + 193);
    ctx.stroke();

    // Thermometer filler

    ctx.fillStyle = "rgba(127,25,25,1.0)";
    ctx.strokeStyle = "rgba(127,25,25,1.0)";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(X + 50, Y + 200);
    ctx.lineTo(X + 50, Y + 32);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(X + 50, Y + 220, 22, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,1.0)";
    ctx.font = "14px Arial";

    ctx.fillText("MAX: ", 90, 32);
    ctx.fillText("NOW: ", 90, 100);
    ctx.fillText("MIN: ", 90, 176);
    ctx.restore();

    drawValue(`${props.data.max}${props.data.scale}`, 90, 50, "rgba(27,27,27,1.0)");
    drawValue(`${props.data.now}${props.data.scale}`, 90, 120, "rgba(27,27,27,1.0)");
    drawValue(`${props.data.min}${props.data.scale}`, 90, 194, "rgba(27,27,27,1.0)");
  }
}
onMounted(() => {
  isType.value = props.type;
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
watchEffect(() => {
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
  if (isType.value === "advanced") {
    c = document.getElementById(`therm_${props.id}`);
    if (c instanceof HTMLCanvasElement) {
      ctx = c.getContext("2d");
      drawBody();
    }
  }
});
</script>
<template>
  <div v-if="isType === 'basic'" class="therm-wrapper">
    <default-sensor :id="'therm_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="therm-wrapper">
    <canvas :id="'therm_' + id" width="150" height="270"></canvas>
  </div>
</template>

<style scoped>
.therm-wrapper {
  width: 100%;
  height: 100%;
}
</style>
