<template>
  <div class="row">
    <div class="col-12 col-md-4 mb-4" v-for="cardItem in summaryCard" :key="cardItem.title">
      <div class="p-6 rounded border shadow-sm d-grid gap-3">
        <div class="d-flex justify-content-between align-items-center">
          <span class="material-icons display-4">{{ cardItem.icon }}</span>
          <h4 class="fs-5 fw-normal text-secondary m-0">{{ cardItem.title }}</h4>
        </div>
        <p class="m-0 text-end">
          <span class="display-3 me-2 text-success">{{
            commaNumber(cardValueMap[cardItem.type])
          }}</span>
          <span class="fs-5 text-secondary">{{ cardItem.unit }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { commaNumber } from '@/utils/base.js'

const props = defineProps({
  favListData: {
    type: Array,
    required: true
  }
})

const summaryCard = [
  {
    type: 'collected',
    title: '已收藏步道',
    unit: '條',
    icon: 'landscape'
  },
  {
    type: 'completed',
    title: '已完成步道',
    unit: '條',
    icon: 'hiking'
  },
  {
    type: 'sumLength',
    title: '累積公里數',
    unit: '公里',
    icon: 'straighten'
  }
]

const collectedCount = computed(() => props.favListData.length)
const completedFavTrails = computed(() => {
  return props.favListData.filter((item) => item.hikingState === true)
})
const completedCount = computed(() => completedFavTrails.value.length)

const sumLength = computed(() => {
  let rawSum = 0
  completedFavTrails.value.forEach((listItem) => {
    rawSum += parseInt(listItem.TR_LENGTH_NUM)
  })
  return rawSum
})

const cardValueMap = {
  collected: collectedCount.value,
  completed: completedCount.value,
  sumLength: sumLength.value
}
</script>
