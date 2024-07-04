<style lang="scss" scoped>
.horizontal-chart {
  width: 100%;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
<template>
  <div></div>
  <div class="horizontal-chart">
    <canvas :id="`horizontal-chart-${chartId}`"></canvas>
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
      updateHorizontalChart()
    } else {
      renderHorizontalChart()
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
    renderHorizontalChart()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderHorizontalChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`horizontal-chart-${props.chartId}`).getContext('2d')

  const config = {
    type: 'bar',
    data: props.chartData,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          max: 100
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.raw + '%'
            }
          }
        }
      }
    }
  }

  chart = new Chart(ctx, config)
}

function updateHorizontalChart() {
  const { labels, datasets } = props.chartData
  ;(chart.data = {
    labels,
    datasets
  }),
    chart.update()
}
</script>
