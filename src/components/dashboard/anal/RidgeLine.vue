<template>
  <div>
    <h2 class="h2">{{ ridgeLineConfig.title }}</h2>
    <p class="text-secondary fw-light">{{ ridgeLineConfig.note }}</p>
    <div class="row col-12">
      <div class="w-100 d-flex justify-content-center">
        <LineChart
          :chart-id="ridgeLineChartId"
          :chart-data="ridgeLineChart"
          :chart-option="ridgeLineChartOption"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { hexToRgb } from '@/utils/base.js'
import { standardChartColor } from '@/utils/chartUtils.js'
import LineChart from '@/components/chart/LineChart.vue'

const ridgeLineConfig = {
  title: '我的山岳稜線圖',
  note: '依已完走步道繪製'
}

const props = defineProps({
  taskListData: {
    type: Array,
    required: true
  }
})

const doneTaskList = computed(() => props.taskListData.filter((item) => item.hikingState))

const ridgeLineChartId = 'ridgeLine'
const ridgeLineChartOption = {
  scalesX: {
    display: false
  },
  scalesY: {
    title: {
      display: true,
      text: '海拔 (m)'
    },
    min: 0,
    max: 4000,
    ticks: {
      stepSize: 250
    }
  }
}

const ridgeLineChart = computed(() => {
  const altitudes = doneTaskList.value.map((trail) => parseInt(trail.info.TR_ALT))
  const trailNames = doneTaskList.value.map((trail) => trail.TR_CNAME)
  const rgbColor = hexToRgb(standardChartColor)

  return {
    labels: trailNames,
    datasets: [
      {
        label: '海拔 (m)',
        data: altitudes,
        backgroundColor: `rgba(${rgbColor}, 0.75)`,
        borderColor: `rgba(${rgbColor}, 1)`,
        borderWidth: 0.5,
        fill: true,
        pointRadius: 2,
        lineTension: 0.4
      }
    ]
  }
})
</script>
