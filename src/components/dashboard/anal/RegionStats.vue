<template>
  <h3 class="h4">{{ regionStatsConfig.sectionTitle }}</h3>
  <div class="card">
    <div class="card-body">
      <PolarAreaChart :chart-id="chartId" :chart-data="polarAreaChartData" />
    </div>
    <div class="card-footer bg-transparent">
      <ul class="list-unstyled d-flex d-flex flex-wrap m-0">
        <li
          class="fs-6 fw-light text-center w-50 mb-2"
          v-for="item in statisticalRegions"
          :key="item.region"
        >
          <span class="me-1">{{ item.region }}：</span>
          <span>{{ item.num }}筆</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PolarAreaChart from '@/components/chart/PolarAreaChart.vue'
import { getRegionByAdmin } from '@/utils/favTrailStateUtils.js'
import { hexToRgb } from '@/utils/base.js'

const regionStatsConfig = {
  sectionTitle: '各地區數量統計'
}

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

const chartId = 'regionPolar'

const statisticalRegions = computed(() => {
  const doneDataRegion = props.favListData
    .filter((item) => item.hikingState)
    .map((doneItem) => getRegionByAdmin(doneItem.info.TR_ADMIN))

  const regionCount = doneDataRegion.reduce((count, region) => {
    count[region] = (count[region] || 0) + 1
    return count
  }, {})

  const result = props.allRegions.map((region, index) => ({
    region,
    num: regionCount[region] || 0,
    color: props.regionsChartColor[index]
  }))

  return result
})

const polarAreaChartData = computed(() => {
  const labels = statisticalRegions.value.map((item) => item.region)
  const data = statisticalRegions.value.map((item) => item.num)
  const color = statisticalRegions.value.map((item) => item.color)
  return {
    labels: labels,
    datasets: [
      {
        label: '完走步道地區數量統計圖',
        data,
        backgroundColor: getChartDataBgC(color, 0.75),
        borderColor: getChartDataBgC(color, 1)
      }
    ]
  }
})

function getChartDataBgC(rawColors, opacity) {
  let result = []
  rawColors.forEach((item) => {
    const rgbColor = hexToRgb(item)
    result.push(`rgba(${rgbColor}, ${opacity})`)
  })
  return result
}
</script>
