<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end mt-10">{{ perAnalConfig.pageTitle }}</h1>
    <div v-if="isEmptyTaskData">
      <EmptyListMes :is-empty-anal="isEmptyDoneTask" />
    </div>
    <div v-else class="block-spacing">
      <div>
        <h2 class="h2">{{ perAnalConfig.ridgeLineSection.title }}</h2>
        <p class="text-secondary fw-light">{{ perAnalConfig.ridgeLineSection.note }}</p>
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
      <div>
        <h2 class="h2">{{ perAnalConfig.progressSection.title }}</h2>
        <p class="text-secondary fw-light mb-10">{{ perAnalConfig.progressSection.note }}</p>
        <ProgressCard :task-list-data="taskListData" />
      </div>
      <ProgressStateChart
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-task-num="doneTaskNum"
      />
      <div>
        <h2 class="h2">{{ perAnalConfig.doneAnalSection.title }}</h2>
        <p class="text-secondary fw-light">{{ perAnalConfig.doneAnalSection.note }}</p>
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { hexToRgb } from '@/utils/base.js'
import { getPalette, standardChartColor } from '@/utils/chartUtils.js'
import { getAllRegionFromFav } from '@/utils/favTrailStateUtils.js'

import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
import CompAnalysis from '@/components/dashboard/anal/CompAnalysis.vue'
import RegionStats from '@/components/dashboard/anal/RegionStats.vue'
import DiffStat from '@/components/dashboard/anal/DiffStat.vue'
import LineChart from '@/components/chart/LineChart.vue'
import EmptyListMes from '@/components/dashboard/EmptyListMes.vue'

const perAnalConfig = {
  pageTitle: '足跡分析',
  ridgeLineSection: {
    title: '我的山岳稜線圖',
    note: '依已完走步道繪製'
  },
  progressSection: {
    title: '執行情況',
    note: '步道完走進度'
  },
  doneAnalSection: {
    title: '探險數據揭秘',
    note: '個人化的完走步道情報分析'
  }
}

const favoriteTrailsStore = useFavoriteTrailsStore()
const { taskListData, allTrailsNum, favTrailsNum, doneTaskNum, isEmptyTaskData } =
  storeToRefs(favoriteTrailsStore)

const isEmptyDoneTask = computed(() => (doneTaskNum.value === 0 ? true : false))

const doneTaskList = computed(() => taskListData.value.filter((item) => item.hikingState))

const allRegions = computed(() => getAllRegionFromFav(taskListData.value) || [])

const regionsChartColor = computed(() => getPalette(allRegions.value.length) || [])

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
