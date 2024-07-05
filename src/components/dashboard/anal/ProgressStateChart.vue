<style lang="scss" scoped>
.state-chart-card {
  height: 100%;
  max-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div class="row flex-lg-row-reverse">
    <div class="col-12 col-lg-4 mb-20 mb-lg-0">
      <h3 class="h4">{{ taskStateConfig.favTrailCompTitle }}</h3>
      <div class="card state-chart-card">
        <div class="chart-square d-flex align-items-center justify-content-center">
          <DoughnutChart :chart-id="favTrailCompChartId" :chart-data="favTrailCompChart" />
          <div class="chart-square__content">
            <p class="m-0 p-0">
              <span class="display-4">{{ favTrailCompState.favCompRate }}</span>
              <span>%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <h3 class="h4">{{ taskStateConfig.totalExecRate }}</h3>
      <div class="card px-6 py-20 state-chart-card">
        <div class="h-100 w-100">
          <HorizontalChart :chart-id="totalExecChartId" :chart-data="totalExecChart" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { priorityChartColor, undoneChartColor, getChartArrColor } from '@/utils/chartUtils.js'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'
import HorizontalChart from '@/components/chart/HorizontalChart.vue'

const taskStateConfig = {
  favTrailCompTitle: '已收藏步道完走率',
  totalExecRate: '收藏與完走占步道總數比例'
}

const props = defineProps({
  allTrailsNum: {
    type: Number,
    required: true
  },
  favTrailsNum: {
    type: Number,
    required: true
  },
  doneTaskNum: {
    type: Number,
    required: true
  }
})

const favTrailCompState = computed(() => {
  const favUndone = parseInt(props.favTrailsNum) - parseInt(props.doneTaskNum)
  const chartData = [props.doneTaskNum, favUndone]
  const favCompRate = Math.round((props.doneTaskNum / props.favTrailsNum) * 100)
  return { chartData, favCompRate }
})
const favTrailCompChartId = 'favTrailComp'
const favTrailCompChart = computed(() => {
  return {
    labels: ['已完走', '未執行'],
    datasets: {
      data: favTrailCompState.value.chartData,
      backgroundColor: [priorityChartColor, undoneChartColor]
    }
  }
})

const totalCompState = computed(() => {
  const FavToTotalRate = Math.round((props.favTrailsNum / props.allTrailsNum) * 100)
  const favCompToTotalRate = Math.round((props.doneTaskNum / props.allTrailsNum) * 100)
  return {
    FavToTotalRate,
    favCompToTotalRate
  }
})
const totalExecChartId = 'totalExec'
const totalExecChart = computed(() => {
  const labels = ['收藏百分比', '完走百分比']
  const datasets = labels.map((label, index) => ({
    label: label,
    data:
      index === 0
        ? [totalCompState.value.FavToTotalRate, 0]
        : [0, totalCompState.value.favCompToTotalRate],
    backgroundColor: getChartArrColor(index)
  }))

  return {
    labels,
    datasets
  }
})
</script>
