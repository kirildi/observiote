<script setup lang="ts">
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import planetChartData from "./chart-data";

Chart.register(...registerables);

const props = defineProps<{
  id: string;
}>();

let c: HTMLElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

function createChart(chartData: any) {
  if (ctx) {
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
    });

    return myChart;
  }
}
onMounted(() => {
  c = document.getElementById(props.id);
  if (c instanceof HTMLCanvasElement) {
    ctx = c.getContext("2d");
    if (ctx) {
      createChart(planetChartData);
    }
  }
});
</script>
<template>
  <canvas :id="id" class="chart-item"></canvas>
</template>

<style scoped>
.chart-item {
  width: 100% !important;
  height: 100% !important;
}
</style>
