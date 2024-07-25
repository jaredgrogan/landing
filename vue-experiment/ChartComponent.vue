<template>
  <div class="chart-container">
    <Bar :chart-data="data" :options="options" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

export default {
  name: 'ChartComponent',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: true,
              color: '#e0e0e0'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#333'
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
