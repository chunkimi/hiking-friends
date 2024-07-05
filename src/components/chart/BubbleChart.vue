<style lang="scss" scoped>
.bubble-chart {
  width: 100%;
  margin: 0 auto;
}
</style>

<template>
  <div class="bubble-chart">
    <canvas :id="`bubble-chart-${chartId}`"></canvas>
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
  chartScales: {
    type: Object,
    required: true
  }
})

let chart = null

watch(
  () => props.chartData,
  () => {
    if (chart) {
      updateBubbleChart()
    } else {
      renderBubbleChart()
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
    renderBubbleChart()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderBubbleChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`bubble-chart-${props.chartId}`).getContext('2d')

  const config = {
    type: 'bubble',
    data: props.chartData,
    options: {
      plugins: {
        responsive: true,
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.raw.floatingText
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: props.chartScales.x
          }
        },
        y: {
          title: {
            display: true,
            text: props.chartScales.y
          }
        }
      }
    }
  }

  chart = new Chart(ctx, config)
}

function updateBubbleChart() {
  const { labels, datasets } = props.chartData
  ;(chart.data = {
    labels,
    datasets
  }),
    chart.update()
}
</script>
