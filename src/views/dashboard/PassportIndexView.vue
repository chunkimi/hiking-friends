<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="block-spacing">
      <ProgressCard :all-trails-data="allTrailsData" :fav-trails-data="favTrailsData" />
      <div class="row">
        <div class="col-12 col-md-8 mb-4">
          <div class="p-6 rounded border shadow-sm">
            <p>bar chart</p>
            <p>chart- collected / Sum</p>
            <p>chart- completed / Sum</p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4">
          <div class="p-6 rounded border shadow-sm">
            <p>donuts chart</p>
            <p>chart- completed / collected</p>
          </div>
        </div>
      </div>
      <FavListOverview :all-trails-data="allTrailsData" :fav-trails-data="favTrailsData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dummyFavTrailsData from '@/data/dummy/favTrailsData.json'
import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'
import ProgressCard from '@/components/dashboard/common/ProgressCard.vue'
import FavListOverview from '@/components/dashboard/passport/FavListOverview.vue'

const allTrailsData = ref(dummyAllTrailsData)
const favTrailsData = ref(dummyFavTrailsData)
</script>
