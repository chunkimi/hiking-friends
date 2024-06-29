<style lang="scss" scoped>
</style>
<template>
  <div class="row flex-lg-row-reverse">
    <div class="col-12 col-lg-4 mb-20 mb-lg-0">
      <h3 class="h5">{{ TaskStateConfig.favTrailCompTitle }}</h3>
      <div class="card p-6">
        <div class="chart-square__container d-flex justify-content-center align-items-center">
          <DoughnutChart :chart-id="favTrailCompChartId" :chart-data="favTrailCompChart" />
          <div class="chart-square__content">
            <p class="text-center m-0 p-0">
              <span class="display-4">{{ favTrailCompState.compRate }}</span>
              <span>%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <h3 class="h4">步道任務統計</h3>
      <div class="card">
        <p>收藏／總數，完成／總數</p>
        <p>Horizontal bar chart</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'
import { getPaletteWithUndone } from '@/utils/chartUtils.js'

const TaskStateConfig = {
  favTrailCompTitle: '已收藏步道完走率'
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
  doneFavNum: {
    type: Number,
    required: true
  }
})

const favTrailCompState = computed(() => {
  const undone = parseInt(props.favTrailsNum) - parseInt(props.doneFavNum)
  const chartData = [props.doneFavNum, undone]
  const compRate = Math.round((props.doneFavNum / props.favTrailsNum) * 100)
  return { chartData, compRate }
})

const favTrailCompChartId = 'favTrailComp'

const favTrailCompChart = computed(() => {
  const rawColor = getPaletteWithUndone(favTrailCompState.value.chartData.length)
  return {
    labels: ['已完走', '未執行'],
    datasets: {
      data: favTrailCompState.value.chartData,
      color: rawColor
    }
  }
})
</script>
