<style lang="scss" scoped>
@import '@/styles/main.scss';

.trail-card {
  &__img {
    height: 240px;
    object-fit: cover;
    object-position: center center;
  }
  &__text {
    max-width: 50vw;
    @include media-breakpoint-up(md) {
      max-width: 18vw;
    }
  }
}
</style>
<template>
  <div
    class="col-12 col-md-6 col-lg-4 mb-5"
    v-for="trailItem in curPageTrails"
    :key="trailItem.TRAILID"
  >
    <div class="card">
      <img
        :src="getTrailImgUrl(trailItem.TRAILID)"
        class="trail-card__img card-img-top"
        alt="trail-img"
      />
      <div class="card-body">
        <h5 class="card-title">{{ trailItem.TR_CNAME }}</h5>
        <div class="card-text">
          <ul class="list-unstyled">
            <li
              v-for="infoItem in trailInfoTitle"
              :key="infoItem.type"
              class="d-flex align-items-center"
            >
              <h6 class="h6">
                <i class="bi me-1" :class="infoItem.icon"></i>{{ infoItem.name }}：
              </h6>
              <p class="mb-2 d-inline-block trail-card__text text-truncate">
                {{ trailItem[infoItem.type] }}
              </p>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-6">
            <RouterLink
              :to="{
                name: trailInfoBtn.moreInfo.pathName,
                params: { trail: trailItem.TRAILID }
              }"
              class="btn w-100"
              :class="`btn-outline-${trailInfoBtn.moreInfo.btnColor}`"
              >{{ trailInfoBtn.moreInfo.name }}</RouterLink
            >
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn w-100"
              :class="`btn-outline-${trailInfoBtn.addList.btnColor}`"
              @click="handleToFavorite(trailItem.TRAILID)"
            >
              {{ trailInfoBtn.addList.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore.js'
import { getTrailImgUrl } from '@/utils/imgUrl.js'

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
