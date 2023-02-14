<template>
  <canvas :id="id" class="chart-item"></canvas>
</template>

<script>
import { onMounted } from "vue"
import { Chart, registerables } from "chart.js"
import planetChartData from "./chart-data"

Chart.register(...registerables)

export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    let ctx = null

    function createChart(chartData) {
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })

      return myChart
    }
    onMounted(() => {
      ctx = {}
      ctx = document.getElementById(props.id).getContext("2d")
      if (ctx !== null) {
        createChart(planetChartData)
      }
    })

    return { ctx, createChart }
  }
}
</script>

<style scoped>
.chart-item {
  width: 100% !important;
  height: 100% !important;
}
</style>
