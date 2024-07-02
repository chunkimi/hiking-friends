<style lang="scss" scoped>
.horizontal-chart {
  width: 80%;
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
      label: function (context) {
        return `${context.formattedValue || '0'}%`
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
