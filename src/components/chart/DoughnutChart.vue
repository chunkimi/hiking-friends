<style lang="scss" scoped>
.doughnut-chart {
  width: 100%;
  aspect-ratio: 1;
  max-width: 320px;
  max-height: 320px;
}
</style>
<template>
  <div class="doughnut-chart">
    <canvas :id="`doughnut-chart-${chartId}`"></canvas>
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
      updateDoughnutChart()
    } else {
      renderDoughnutChart()
    }
  },
  { deep: true, immediate: true }
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderDoughnutChart() {
  await nextTick()
  if (chart) {
    chart.destroy()
  }

  const ctx = document.getElementById(`doughnut-chart-${props.chartId}`).getContext('2d')
  const { labels, datasets } = props.chartData

  const data = {
    labels: labels,
    datasets: [
      {
        ...datasets,
        hoverOffset: 4
      }
    ]
  }

  const config = {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        responsive: true,
        legend: {
          display: false
        }
      },
      cutout: 80
    }
  }

  chart = new Chart(ctx, config)
}

function updateDoughnutChart() {
  const { labels, datasets } = props.chartData
  ;(chart.data = {
    labels,
    datasets
  }),
    chart.update()
}
</script>
