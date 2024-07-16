<style lang="scss" scoped>
@import '@/styles/main.scss';
.trail-subject {
  position: relative;
  width: 100%;
  height: 60vw;
  margin-bottom: 80px;
  @include media-breakpoint-up(md) {
    height: 45vw;
  }
  @include media-breakpoint-up(lg) {
    margin-bottom: 0;
    width: 36rem;
    height: 24rem;
  }

  @include media-breakpoint-up(xl) {
    width: 45rem;
    height: 30rem;
  }
  &__head {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    padding: 2rem 1rem;
    background-color: rgba($light, 0.9);
    @include media-breakpoint-up(lg) {
      top: 50%;
      left: 45%;
      transform: translate(50%, -50%);
      width: 60%;
      max-width: 360px;
    }
    @include media-breakpoint-up(xl) {
      left: 60%;
      padding: 2rem;
      width: 45%;
      height: 60%;
      max-width: 360px;
    }
  }
}
.btn-primary {
  --bs-btn-color: #fff;
}
</style>
<template>
  <div class="row">
    <div class="col-12 col-lg-8 offset-lg-1 offset-xl-2">
      <div
        class="trail-subject"
        :style="{
          background: `url(${getTrailImgUrl(trailInfo.TRAILID)})` + `no-repeat center  center/cover`
        }"
      >
        <div
          class="trail-subject__head d-flex flex-column justify-content-center align-items-end align-items-xl-start"
        >
          <p class="text-darken p-0 m-0">{{ trailInfo.TR_POSITION }}</p>
          <h2 class="h2 text-success text-end text-xl-start my-4">
            {{ trailInfo.TR_CNAME }}
          </h2>
          <button
            type="button"
            class="btn btn-primary ms-auto trail-subject__btn w-100 w-lg-25"
            @click="handleToFavorite(trailInfo.TRAILID)"
          >
            加入收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getTrailImgUrl } from '@/utils/imgUrl'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore.js'
defineProps({
  trailInfo: {
    type: Object,
    required: true
  }
})

const favoriteTrailsStore = useFavoriteTrailsStore()
const { handleToFavorite } = favoriteTrailsStore
</script>
