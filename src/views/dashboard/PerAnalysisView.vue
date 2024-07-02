<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end my-10">{{ perAnalConfig.pageTitle }}</h1>
    <div class="block-spacing">
      <div class="">
        <h2 class="h2">{{ perAnalConfig.primarySection.title }}</h2>
        <p class="text-secondary fw-light mb-10">{{ perAnalConfig.primarySection.note }}</p>
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
        <h2 class="h2">{{ perAnalConfig.secondarySection.title }}</h2>
        <p class="text-secondary fw-light">{{ perAnalConfig.secondarySection.note }}</p>
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
        <div class="col-12 col-lg-6">
          <RegionStats
            :fav-list-data="favStateListData"
            :all-regions="allRegions"
            :regions-chart-color="regionsChartColor"
          ></RegionStats>
        </div>
      </div>

      <!-- 圖表:步道難度與地區 -->
      <!-- <div class="block-spacing">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="card">
                <h3 class="h4">難易度統計</h3>
                <p>bar chart</p>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="card">
                <h3 class="h4">地區統計</h3>
                <p>polar area chart</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <h3 class="h4">步道難易度與地區綜合分析</h3>
                <p>radar chart</p>
              </div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
import CompAnalysis from '@/components/dashboard/anal/CompAnalysis.vue'
import RegionStats from '@/components/dashboard/anal/RegionStats.vue'
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
  primarySection: {
    title: '執行情況',
    note: '步道完走進度'
  },
  secondarySection: {
    title: '探險數據揭秘',
    note: '個人化的完走步道情報分析'
  }
}

const allRegions = computed(() => getAllRegionFromFav(favStateListData.value) || [])

const regionsChartColor = computed(() => getPalette(allRegions.value.length) || [])
</script>
