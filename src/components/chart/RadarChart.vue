<style lang="scss" scoped>
.radar-chart {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>
<template>
  <div class="radar-chart">
    <canvas :id="`radar-chart-${chartId}`"></canvas>
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
      updateRadarChart()
    } else {
      RadarRadarChart()
    }
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function RadarRadarChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`radar-chart-${props.chartId}`).getContext('2d')

  const { labels, datasets } = props.chartData

  const maxScaleValue = Math.max(...datasets[0].data) + 2

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
    type: 'radar',
    data,
    options: {
      responsive: true,
      plugins: {
        responsive: true,
        legend: {
          position: 'top'
        }
      },
      scales: {
        r: {
          min: 0,
          max: maxScaleValue,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  }

  chart = new Chart(ctx, config)
}

function updateRadarChart() {
  const { labels, datasets } = props.chartData
  const maxScaleValue = Math.max(...datasets[0].data) + 2

  chart.data.labels = labels
  chart.data.datasets = [
    {
      ...datasets[0],
      borderWidth: 1
    }
  ]

  chart.options.scales.r.max = maxScaleValue
  chart.update()
}
</script>
