<script setup lang="ts">
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import planetChartData from "./chart-data";

Chart.register(...registerables);

const props = defineProps<{
  id: string;
}>();

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
  ctx = null;
  ctx = document.getElementById(props.id).getContext("2d");
  if (ctx !== null) {
    createChart(planetChartData);
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
