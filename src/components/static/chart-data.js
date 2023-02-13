const planetChartData = {
  type: "line",
  data: {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        // one line graph
        label: "Frequency",
        data: [10, 100, 5, 2, 67, 62, 27, 14, 15, 20, 56],
        fill: true,
        backgroundColor: ["#232b2b"],
        borderColor: ["#f4efde"],
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.1
      },
      {
        // another line graph
        label: "Temperature",
        data: [4, 12, 12, 6, 9, 14, 50, 49, 55, 60, 66],
        fill: true,
        backgroundColor: ["#354040"],
        borderColor: ["#f4efde"],
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.1
      }
    ]
  },
  options: {
    responsive: true,
    animation: false,
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 10,
        display: true,
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          display: true,
          color: "#f4efde"
        }
      },
      y: {
        type: "linear",
        min: 0,
        max: 100,
        display: true,
        beginAtZero: true,
        grid: {
          display: true,
          color: "#282828"
        },
        ticks: {
          display: true,
          color: "#f4efde"
        }
      }
    },
    plugins: {
      legend: { position: "top", align: "end", labels: { color: "#f4efde" } }
    }
  }
}

export default planetChartData
