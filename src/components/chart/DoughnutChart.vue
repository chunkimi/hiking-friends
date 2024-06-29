<style lang="scss" scoped>
.doughnut-chart {
  width: 100%;
  aspect-ratio: 1;
  max-width: 320px;
  max-height: 320px;
}
</style>
<template>
  <div></div>
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
  () => props.data,
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

  const data = {
    labels: props.chartData.labels,
    datasets: [
      {
        label: props.chartData.datasets.label || '',
        data: props.chartData.datasets.data,
        backgroundColor: props.chartData.datasets.color,
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
  ;(chart.data = {
    labels: props.data.labels,
    datasets: [
      {
        data: props.chartData.data,
        backgroundColor: props.chartData.color
      }
    ]
  }),
    chart.update()
}
</script>
