<style lang="scss" scoped></style>
<template>
  <h3 class="h4">{{ diffStatConfig.sectionTitle }}</h3>
  <div class="card">
    <div class="card-cody d-flex justify-content-center">
      <RadarChart :chart-id="chartId" :chart-data="radarChartData" />
    </div>
    <div class="card-footer bg-transparent">
      <ul class="list-unstyled d-flex flex-wrap m-0">
        <li
          class="fs-6 fw-light text-center w-50 mb-2"
          v-for="item in statisticalDiffs"
          :key="item.degree"
        >
          <span class="me-1">等級{{ item.degree }}：</span>
          <span>{{ item.num }}筆</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { trailDifClassArr } from '@/data/trailDifClass.js'
import { criticalChartColor } from '@/utils/chartUtils.js'
import { hexToRgb } from '@/utils/base.js'
import RadarChart from '@/components/chart/RadarChart.vue'

const diffStatConfig = {
  sectionTitle: '難易度統計'
}

const props = defineProps({
  doneTaskList: {
    type: Array,
    required: true
  }
})

const statisticalDiffs = computed(() => {
  const labels = trailDifClassArr.map((item) => item.degree)

  const doneDataDiff = props.doneTaskList
    .filter((item) => item.hikingState)
    .map((doneItem) => doneItem.info.TR_DIF_CLASS)

  const diffCount = doneDataDiff.reduce((count, degree) => {
    count[degree] = (count[degree] || 0) + 1
    return count
  }, {})

  const result = labels.map((degree) => ({
    degree,
    num: diffCount[degree] || 0
  }))

  return result
})

const radarChartData = computed(() => {
  const rgbColor = hexToRgb(criticalChartColor)

  const labels = statisticalDiffs.value.map((item) => item.degree)

  const data = statisticalDiffs.value.map((item) => item.num)

  return {
    labels,
    datasets: [
      {
        label: '步道難易度分佈數量',
        data,
        backgroundColor: `rgba(${rgbColor}, 0.4)`,
        borderColor: `rgba(${rgbColor}, 1)`
      }
    ]
  }
})

const chartId = 'diffStat'
</script>
