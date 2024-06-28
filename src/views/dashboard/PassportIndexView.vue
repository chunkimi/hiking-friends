<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="block-spacing">
      <!-- <ProgressCard :all-trails-data="allTrailsData" :fav-trails-data="favTrailsData" /> -->
      <ProgressCard :fav-list-data="favTrailsListData" />
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
      <FavListOverview :fav-list-data="favTrailsListData" />
    </div>
  </div>
</template>

<script setup>
import ProgressCard from '@/components/dashboard/ProgressCard.vue'
import FavListOverview from '@/components/dashboard/FavListOverview.vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)
</script>
