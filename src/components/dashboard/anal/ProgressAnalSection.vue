<template>
  <div>
    <h2 class="h2">{{ progressConfig.title }}</h2>
    <p class="text-secondary fw-light mb-10">{{ progressConfig.note }}</p>
    <ProgressCard :task-list-data="taskListData" />
  </div>
  <ProgressStateChart
    :all-trails-num="allTrailsNum"
    :fav-trails-num="favTrailsNum"
    :done-task-num="doneTaskNum"
  />
</template>
<script setup>
import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
const progressConfig = {
  title: '執行情況',
  note: '步道完走進度'
}

defineProps({
  taskListData: {
    type: Array,
    required: true
  },
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
</script>
