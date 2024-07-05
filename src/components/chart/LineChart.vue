<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
<template>
  <div class="line-chart">
    <canvas :id="`line-chart-${chartId}`"></canvas>
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
  },
  chartOption: {
    type: Object,
    required: true
  }
})

let chart = null

watch(
  () => props.chartData,
  () => {
    if (chart) {
      updateLineChart()
    } else {
      renderLineChart()
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
    renderLineChart()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderLineChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`line-chart-${props.chartId}`).getContext('2d')

  const config = {
    type: 'line',
    data: props.chartData,
    options: {
      scales: {
        x: props.chartOption.scalesX,
        y: props.chartOption.scalesY
      },
      plugins: {
        responsive: true,
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}`
            }
          }
        }
      }
    }
  }

  chart = new Chart(ctx, config)
}

function updateLineChart() {
  chart.data = props.chartData

  const { scalesX, scalesY } = props.chartOption
  chart.options.scales.x = scalesX
  chart.options.scales.y = scalesY
  chart.update()
}
</script>
