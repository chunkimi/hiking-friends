<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="block-spacing">
      <ProgressCard :fav-list-data="favTrailsListData" />
      <ProgressStateChart
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-fav-num="doneFavNum"
      />
      <FavListOverview :fav-list-data="favTrailsListData" />
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/ProgressStateChart.vue'
import FavListOverview from '@/components/dashboard/FavListOverview.vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData, allTrailsNum, favTrailsNum, doneFavNum } =
  storeToRefs(favoriteTrailsStore)
</script>
