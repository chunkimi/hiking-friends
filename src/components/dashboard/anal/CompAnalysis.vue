<style lang="scss" scoped></style>
<template>
  <div>
    <h3 class="h4 m-0">{{ compAnalConfig.sectionTitle }}</h3>
    <p class="text-secondary fw-lighter">{{ compAnalConfig.note }}</p>
    <div class="card p-6">
      <BubbleChart
        :chart-id="chartId"
        :chart-data="bubbleChartData"
        :chart-scales="compAnalConfig.chartScales"
      />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import BubbleChart from '@/components/chart/BubbleChart.vue'
import { getRegionByAdmin } from '@/utils/favTrailStateUtils.js'
import { hexToRgb } from '@/utils/base.js'

const props = defineProps({
  favListData: {
    type: Array,
    required: true
  },
  allRegions: {
    type: Array,
    required: true
  },
  regionsChartColor: {
    type: Array,
    required: true
  }
})

const compAnalConfig = {
  sectionTitle: '綜合分析',
  note: '圓點大小依照步道難易度',
  chartScales: {
    x: '步道長度 (公里)',
    y: '海拔高度 (公尺)'
  }
}

const chartId = 'comAnal'

const bubbleChartData = computed(() => {
  const bubbleSizeBase = 5
  const doneData = props.favListData
    .filter((item) => item.hikingState)
    .map((doneItem) => {
      const region = getRegionByAdmin(doneItem.info.TR_ADMIN)
      const chartValue = {
        x: parseInt(doneItem.info.TR_LENGTH_NUM),
        y: parseInt(doneItem.info.TR_ALT),
        r: parseInt(doneItem.info.TR_DIF_CLASS) * bubbleSizeBase,
        floatingText: `${doneItem.TR_CNAME}，難度${doneItem.info.TR_DIF_CLASS}，長度${doneItem.info.TR_LENGTH_NUM}，海拔${doneItem.info.TR_ALT}`
      }
      return {
        region,
        chartValue
      }
    })

  const result = []

  props.allRegions.forEach((regionItem, index) => {
    const rawData = doneData
      .filter((doneItem) => doneItem.region === regionItem)
      .map((filterItem) => {
        return {
          ...filterItem.chartValue
        }
      })
    const rgbColor = hexToRgb(props.regionsChartColor[index])
    const rawResult = {
      label: regionItem,
      data: rawData,
      backgroundColor: `rgba(${rgbColor}, 0.75)`,
      hoverBackgroundColor: `rgba(${rgbColor}, 1)`
    }
    result.push(rawResult)
  })

  return { datasets: result }
})
</script>
