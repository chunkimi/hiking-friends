<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="block-spacing">
      <ProgressCard :all-trails-data="allTrailsData" :fav-trails-data="favTrailsData" />
      <FavListOverview :all-trails-data="allTrailsData" :fav-trails-data="favTrailsData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dummyFavTrailsData from '@/data/dummy/favTrailsData.json'
import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'
import ProgressCard from '@/components/dashboard/common/ProgressCard.vue'
import FavListOverview from '@/components/dashboard/common/FavListOverview.vue'

const allTrailsData = ref(dummyAllTrailsData)
const favTrailsData = ref(dummyFavTrailsData)
</script>
