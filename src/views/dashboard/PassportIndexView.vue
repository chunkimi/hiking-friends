<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end mt-10">{{ passportConfig.pageTitle }}</h1>
    <div class="block-spacing">
      <ProgressCard :fav-list-data="favStateListData" />
      <ProgressStateChart
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-fav-num="doneFavNum"
      />
      <FavListOverview :fav-list-data="favStateListData" />
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
import FavListOverview from '@/components/dashboard/list/FavListOverview.vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favStateListData, allTrailsNum, favTrailsNum, doneFavNum } =
  storeToRefs(favoriteTrailsStore)

const passportConfig = {
  pageTitle: '總覽'
}
</script>
