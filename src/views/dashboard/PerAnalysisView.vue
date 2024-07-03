<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end mt-10">{{ perAnalConfig.pageTitle }}</h1>
    <div class="block-spacing">
      <div>
        <h2 class="h2">{{ perAnalConfig.ridgeLineSection.title }}</h2>
        <p class="text-secondary fw-light mb-10">{{ perAnalConfig.ridgeLineSection.note }}</p>
        <div class="w-100">
          <LineChart
            :chart-id="ridgeLineChartId"
            :chart-data="ridgeLineChart"
            :chart-option="ridgeLineChartOption"
          />
        </div>
      </div>
      <div>
        <h2 class="h2">{{ perAnalConfig.progressSection.title }}</h2>
        <p class="text-secondary fw-light mb-10">{{ perAnalConfig.progressSection.note }}</p>
        <ProgressCard :fav-list-data="favStateListData" />
      </div>
      <ProgressStateChart
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-fav-num="doneFavNum"
      />
      <div class="mt-20">
        <h2 class="h2">{{ perAnalConfig.doneAnalSection.title }}</h2>
        <p class="text-secondary fw-light">{{ perAnalConfig.doneAnalSection.note }}</p>
        <div class="row">
          <div class="col-12">
            <CompAnalysis
              :fav-list-data="favStateListData"
              :all-regions="allRegions"
              :regions-chart-color="regionsChartColor"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-6 mb-20 mb-lg-0">
          <RegionStats
            :done-fav-list="doneFavList"
            :all-regions="allRegions"
            :regions-chart-color="regionsChartColor"
          />
        </div>
        <div class="col-12 col-lg-6">
          <DiffStat :done-fav-list="doneFavList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
import CompAnalysis from '@/components/dashboard/anal/CompAnalysis.vue'
import RegionStats from '@/components/dashboard/anal/RegionStats.vue'
import DiffStat from '@/components/dashboard/anal/DiffStat.vue'
import LineChart from '@/components/chart/LineChart.vue'

import { hexToRgb } from '@/utils/base.js'
import { getPalette, standardChartColor } from '@/utils/chartUtils.js'
import { getAllRegionFromFav } from '@/utils/favTrailStateUtils.js'

import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { computed } from 'vue'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favStateListData, allTrailsNum, favTrailsNum, doneFavNum } =
  storeToRefs(favoriteTrailsStore)

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

const doneFavList = computed(() => favStateListData.value.filter((item) => item.hikingState))

const allRegions = computed(() => getAllRegionFromFav(favStateListData.value) || [])

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
  const altitudes = doneFavList.value.map((trail) => parseInt(trail.info.TR_ALT))
  const trailNames = doneFavList.value.map((trail) => trail.TR_CNAME)
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
