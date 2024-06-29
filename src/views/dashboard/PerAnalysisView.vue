<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="block-spacing">
      <h1 class="h1 text-end">{{ perAnalConfig.pageTitle }}</h1>
      <ProgressCard :fav-list-data="favTrailsListData" />
      <!-- 圖表:收藏／總數，完成／總數，完成／收藏 -->

      <div class="block-spacing">
        <h2 class="h3">已完成步道偏好分析</h2>
        <div>
          <h3 class="h4">綜合分析</h3>
        </div>
        <!-- 圖表:步道難度與地區 -->
        <div class="block-spacing">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/ProgressCard.vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)

const perAnalConfig = {
  pageTitle: '足跡分析'
}
</script>
