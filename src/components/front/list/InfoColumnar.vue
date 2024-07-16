<style lang="scss" scoped>
.trail-columnar {
  &__text {
    width: 5rem;
  }
}
</style>
<template>
  <li class="list-group-item py-2" v-for="trailItem in curPageTrails" :key="trailItem.TRAILID">
    <div class="d-flex justify-content-between">
      <h5 class="h5">{{ trailItem.TR_CNAME }}</h5>
      <div class="d-flex align-items-start">
        <RouterLink
          :to="{
            name: trailsListItemBtn.moreInfo.pathName,
            params: { trail: trailItem.TRAILID }
          }"
          class="btn btn-sm me-3"
          :class="`btn-outline-${trailsListItemBtn.moreInfo.btnColor}`"
          ><i class="bi" :class="trailsListItemBtn.moreInfo.icon"></i
        ></RouterLink>
        <button
          type="button"
          class="btn btn-sm"
          :class="`btn-outline-${trailsListItemBtn.addList.btnColor}`"
          @click="handleToFavorite(trailItem.TRAILID)"
        >
          <i class="bi" :class="trailsListItemBtn.addList.icon"></i>
        </button>
      </div>
    </div>
    <ul class="list-unstyled row" v-if="isMediaMdUp">
      <li
        class="col-md-6 col-lg-3 d-flex align-items-center"
        v-for="infoItem in trailsListItemTitle"
        :key="infoItem.type"
      >
        <h6 class="h6"><i class="bi me-1" :class="infoItem.icon"></i>{{ infoItem.name }}：</h6>
        <p class="mb-2 d-inline-block trail-columnar__text text-truncate">
          {{ trailItem[infoItem.type] }}
        </p>
      </li>
    </ul>
  </li>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore.js'
import { trailsListItemBtn, trailsListItemTitle } from '@/utils/trailItemUtils.js'
import { useMediaQuery } from '@vueuse/core'
const isMediaMdUp = useMediaQuery('(min-width: 767px)')

defineProps({
  curPageTrails: {
    type: Array,
    required: true
  }
})

const favoriteTrailsStore = useFavoriteTrailsStore()
const { handleToFavorite } = favoriteTrailsStore
</script>
