<template>
  <button
    class="fa fa-bar-chart settings-button"
    @click=";(isSensorChartVisible = true), onChartOpen()"
  ></button>
  <div
    v-show="isSensorChartVisible"
    :id="sensorId"
    class="sensor-chart-wrapper"
  >
    <div class="sensor-chart-header">
      <button
        class="fa fa-close close-chart w3-left"
        style="
            padding: 0.5rem;
            background-color: #303030;
            border-radius: 0.6rem;
          "
        @click="isSensorChartVisible = false"
      ></button>
      <span class="w3-center"> {{ labelName }} history</span>
    </div>
    <div class="sensor-chart-body">
      <span v-show="chartTextShowed" class="chart-text-top"
        >No data available</span
      >
      <canvas :id="chartId" class="chart-item"></canvas>
    </div>
    <button class="chart-settings-menu" @click="isPropertiesMenuVisible = true">
      <em class="fa fa-cog"></em>
    </button>
    <div
      v-show="isPropertiesMenuVisible"
      class="w3-col s12 m6 l5 chart-settings"
    >
      <button
        class="fa fa-close close-chart w3-left"
        style="
          padding: 0.5rem;
          background-color: #303030;
          border-radius: 0.6rem;
        "
        @click="isPropertiesMenuVisible = false"
      ></button>
      <div style="margin-top: 1rem">
        <label for="select" style="text-aling: left">Chart time range: </label>
        <select
          :id="'time-select-' + sensorId"
          name="select"
          class="select-range"
          @change="selectedTimePeriod()"
        >
          <option value="1 hour">1 hour</option>
          <option value="3 hours">3 hours</option>
          <option value="6 hours">6 hours</option>
          <option value="12 hours">12 hours</option>
          <option value="1 day">1 day</option>
          <option value="3 days">3 days</option>
          <option value="7 days">7 days</option>
          <option value="3 weeks">3 weeks</option>
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
          <option value="1 year">1 year</option>
          <option value="3 years">3 years</option>
          <option value="5 years">5 years</option>
          <option value="10 years">10 years</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { Chart, registerables } from "chart.js"
import "chartjs-adapter-luxon"
import Cookies from "js-cookie"
import { HTTP } from "../httpObject"

Chart.register(...registerables)

export default {
  name: "SensorHistoryChart",
  props: {
    chartId: {
      type: String,
      default: ""
    },
    labelName: {
      type: String,
      default: ""
    },
    sensorId: {
      type: Number,
      default: 0
    },
    devId: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const isSensorChartVisible = ref(false)
    const isPropertiesMenuVisible = ref(false)

    let ctx = null
    let historyChartData = {}
    let newCt = {}
    const chartTextShowed = ref(true)
    const chartDataFiltered = ref([])

    function createChart(chartData) {
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      return myChart
    }
    /*
      Data object from emitter is formated like this, or check parrent file for more info:
      {
        slelectedValue: selectmenu.value,
        sensorType: props.sensorType,
        devId: props.devId,
        sensorId: props.sensorId
      }
    */
    function createHttpBody(timeMod) {
      return {
        deviceId: props.devId,
        sensorId: props.sensorId,
        timeModifier: timeMod
        // authValue:"c373e03679e0d1a79a946b0ed81690b8366ea9f037c569506303aed56a0cbebb"
      }
    }
    async function fetchChartData(body) {
      const authToken = Cookies.get("token")
      const chartDataRequest = HTTP.post(
        "/iotpp/rest/sensor_service/chart_value",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      chartDataFiltered.value = []
      chartDataRequest
        .then(response => {
          for (let index = 0; index < response.data.length; index += 1) {
            let dateString = response.data[
              index
            ].constructedDataPacketDate.slice(0, 19)
            chartDataFiltered.value.push({
              x: dateString,
              y: response.data[index].constructedDataPacketValue
            })

            dateString = ""
          }
        })
        .then(() => {
          if (chartDataFiltered.value.length === 0) {
            chartTextShowed.value = true
          } else {
            chartTextShowed.value = false
          }
          newCt.data.datasets[0].data = chartDataFiltered.value
          newCt.update()
        })
    }
    function selectedTimePeriod() {
      const selectmenu = document.getElementById(
        `time-select-${props.sensorId}`
      )

      const httpBody = createHttpBody(selectmenu.value)
      fetchChartData(httpBody)
    }
    function onChartOpen() {
      // const defaultPeriod = "7 days"
      // const httpBody = createHttpBody(defaultPeriod)
      // fetchChartData(httpBody)
    }

    onMounted(() => {
      historyChartData = {
        type: "line",
        data: {
          datasets: [
            {
              // one line graph
              label: "",
              data: [],
              fill: true,
              backgroundColor: ["#201b2b"],
              borderColor: ["#f4efde"],
              pointBackgroundColor: ["#f4efde"],
              borderWidth: 1,
              pointRadius: 1.5,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          parsing: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "week"
              },
              display: true,
              beginAtZero: true,
              grid: {
                display: true,
                color: "#4c4c4c"
              },
              ticks: {
                display: true,
                color: "#f4efde"
              }
            },
            y: {
              type: "linear",
              display: true,
              beginAtZero: true,
              grid: {
                display: true,
                color: "#4c4c4c"
              },
              ticks: {
                display: true,
                color: "#f4efde"
              }
            }
          },
          plugins: {
            legend: {
              position: "top",
              align: "end",
              labels: { color: "#f4efde" }
            }
          }
        }
      }
      ctx = {}
      ctx = document.getElementById(props.chartId).getContext("2d")

      if (ctx !== null) {
        historyChartData.data.datasets[0].label = props.labelName
        newCt = createChart(historyChartData)
      }
    })

    return {
      isSensorChartVisible,
      isPropertiesMenuVisible,
      ctx,
      historyChartData,
      newCt,
      chartTextShowed,
      chartDataFiltered,
      onChartOpen,
      selectedTimePeriod,
      createHttpBody,
      fetchChartData,
      createChart
    }
  }
}
</script>

<style scoped>
.sensor-chart-wrapper {
  width: 90%;
  height: auto;
  position: fixed;
  top: 1em;
  left: 0;
  margin: 5% 5%;
  padding: 1rem;
  background-color: #1d1d1d;
  z-index: 1004;
  border-radius: 0.6em;
}

.sensor-chart-header {
  width: 100%;
  height: 3rem;
  padding: 0.5em;
  text-align: center;
}

.sensor-chart-body {
  width: 100%;
  height: 17rem;
}

.settings-button,
.close-chart,
.chart-settings-menu {
  color: #f4efde;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.chart-item {
  width: 100% !important;
  height: 16rem !important;
  padding: 1em;
}

.chart-settings-menu {
  width: 8%;
  height: 3rem;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #505050;
  border-radius: 0 0.6em 0 0;
}

.chart-settings {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  padding: 1em;
  border-radius: 0 0.6em 0.6em 0;
  background-color: #2f2f2f;
}

.chart-text-top {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  width: 12rem;
}
</style>
