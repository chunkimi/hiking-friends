<style lang="scss" scoped>
.polar-area-chart {
  width: 80%;
  margin: 0 auto;
}
</style>
<template>
  <div></div>
  <div class="polar-area-chart">
    <canvas :id="`polar-area-chart-${chartId}`"></canvas>
  </div>
</template>
<script setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  chartId: {
    type: String,
    required: true
  },
  chartData: {
    type: Object,
    required: true
  }
})

let chart = null

watch(
  () => props.chartData,
  () => {
    if (chart) {
      updatePolarAreaChart()
    } else {
      renderPolarAreaChart()
    }
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderPolarAreaChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`polar-area-chart-${props.chartId}`).getContext('2d')

  const { labels, datasets } = props.chartData

  const data = {
    labels: labels,
    datasets: [
      {
        ...datasets[0],
        borderWidth: 1
      }
    ]
  }

  const config = {
    type: 'polarArea',
    data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex
              const label = context.chart.data.labels[index]
              const value = context.chart.data.datasets[0].data[index]
              return `${label}: ${value}`
            }
          }
        },
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: props.chartData.datasets[0].label
        }
      }
    }
  }

  chart = new Chart(ctx, config)
}

function updatePolarAreaChart() {
  const { labels, datasets } = props.chartData

  const data = {
    labels: labels,
    datasets: [
      {
        ...datasets[0],
        borderWidth: 1
      }
    ]
  }
  ;(chart.data = data), chart.update()
}
</script>
