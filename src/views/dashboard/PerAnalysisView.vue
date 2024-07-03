<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end my-10">{{ perAnalConfig.pageTitle }}</h1>
    <div>
      <h2 class="h2">{{ perAnalConfig.ridgeLineSection.title }}</h2>
      <p class="text-secondary fw-light mb-10">{{ perAnalConfig.ridgeLineSection.note }}</p>
    </div>
    <div class="block-spacing">
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
    </div>
    <div class="block-spacing">
      <div>
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

import { getPalette } from '@/utils/chartUtils.js'
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

console.log('doneFavList', doneFavList.value)

const allRegions = computed(() => getAllRegionFromFav(favStateListData.value) || [])

const regionsChartColor = computed(() => getPalette(allRegions.value.length) || [])
</script>
