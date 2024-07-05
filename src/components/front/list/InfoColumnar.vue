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
      <div class="d-flex">
        <RouterLink
          :to="{
            name: trailInfoBtn.moreInfo.pathName,
            params: { trail: trailItem.TRAILID }
          }"
          class="btn w-100 me-3"
          :class="`btn-outline-${trailInfoBtn.moreInfo.btnColor}`"
          ><i class="bi" :class="trailInfoBtn.moreInfo.icon"></i
        ></RouterLink>
        <button
          type="button"
          class="btn w-100"
          :class="`btn-outline-${trailInfoBtn.addList.btnColor}`"
          @click="handleToFavorite(trailItem.TRAILID)"
        >
          <i class="bi" :class="trailInfoBtn.addList.icon"></i>
        </button>
      </div>
    </div>
    <ul class="list-unstyled row" v-if="isMediaMdUp">
      <li
        class="col-md-6 col-lg-3 d-flex align-items-center"
        v-for="infoItem in trailInfoTitle"
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
import { useMediaQuery } from '@vueuse/core'
const isMediaMdUp = useMediaQuery('(min-width: 767px)')

defineProps({
  curPageTrails: {
    type: Array,
    required: true
  },
  trailInfoTitle: {
    type: Array,
    required: true
  },
  trailInfoBtn: {
    type: Object,
    required: true
  }
})

const favoriteTrailsStore = useFavoriteTrailsStore()
const { handleToFavorite } = favoriteTrailsStore
</script>
