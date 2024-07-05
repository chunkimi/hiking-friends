<template>
  <div>
    <h2 class="h2">{{ doneAnalConfig.title }}</h2>
    <p class="text-secondary fw-light">{{ doneAnalConfig.note }}</p>
    <div class="row">
      <div class="col-12">
        <CompAnalysis
          :task-list-data="taskListData"
          :all-regions="allRegions"
          :regions-chart-color="regionsChartColor"
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-lg-6 mb-20 mb-lg-0">
      <RegionStats
        :done-task-list="doneTaskList"
        :all-regions="allRegions"
        :regions-chart-color="regionsChartColor"
      />
    </div>
    <div class="col-12 col-lg-6">
      <DiffStat :done-task-list="doneTaskList" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { getPalette } from '@/utils/chartUtils.js'
import { getAllRegionFromFav } from '@/utils/favTrailStateUtils.js'
import CompAnalysis from '@/components/dashboard/anal/CompAnalysis.vue'
import RegionStats from '@/components/dashboard/anal/RegionStats.vue'
import DiffStat from '@/components/dashboard/anal/DiffStat.vue'

const doneAnalConfig = {
  title: '探險數據揭秘',
  note: '個人化的完走步道情報分析'
}

const props = defineProps({
  taskListData: {
    type: Array,
    required: true
  }
})

const doneTaskList = computed(() => props.taskListData.filter((item) => item.hikingState))

const allRegions = computed(() => getAllRegionFromFav(props.taskListData) || [])

const regionsChartColor = computed(() => getPalette(allRegions.value.length) || [])
</script>
