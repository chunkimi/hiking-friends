<style lang="scss" scoped>
.polar-area-chart {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
<template>
  <div class="polar-area-chart">
    <canvas :id="`polar-area-chart-${chartId}`"></canvas>
  </div>
</template>
<script setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

import { useMediaQuery } from '@vueuse/core'
const isMediaLgDown = useMediaQuery('(max-width: 991px)')
const isMediaLgUp = useMediaQuery('(min-width: 992px)')
const isMediaXXLUp = useMediaQuery('(min-width: 1400px)')

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

watch(
  [isMediaLgDown, isMediaLgUp, isMediaXXLUp],
  () => {
    if (chart) {
      chart.destroy()
    }
    renderPolarAreaChart()
  },
  { immediate: true }
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
    type: 'polarArea',
    data,
    options: {
      responsive: true,
      plugins: {
        responsive: true,
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

function updatePolarAreaChart() {
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
}
</script>
