<style lang="scss" scoped>
@import '@/styles/main.scss';

.tour-list {
  &__wrap {
    &--right {
      @include media-breakpoint-up(lg) {
        background-repeat: no-repeat;
        background-size: auto;
        background-position: calc(100% - $bg-spacer) bottom;
      }
    }
    &--left {
      @include media-breakpoint-up(lg) {
        background-repeat: no-repeat;
        background-size: auto;
        background-position: $bg-spacer top;
      }
    }
  }
}

.recommend {
  &__img {
    height: 240px;
    object-fit: cover;
    object-position: center center;
  }
  &__text {
    max-width: 50vw;
    @include media-breakpoint-up(lg) {
      max-width: 60%;
    }
  }
}
</style>
<template>
  <div
    class="tour-list__wrap--left"
    :style="{
      backgroundImage: isMediaLgUp ? `url(${getImageUrl(gradedListInfo.bgImg.left)})` : 'none'
    }"
  >
    <div
      class="tour-list__wrap--right"
      :style="{
        backgroundImage: isMediaLgUp ? `url(${getImageUrl(gradedListInfo.bgImg.right)})` : 'none'
      }"
    >
      <div class="container">
        <IconTitle
          :is-clock-line="gradedListInfo.title.isClock"
          :icon="gradedListInfo.title.icon"
          :color="gradedListInfo.title.textColor"
          :title-text="gradedListInfo.title.title"
        />
        <ul class="list-unstyled row mt-10">
          <li
            class="col-12 col-lg-4 mb-6 mb-lg-0"
            v-for="recommendItem in recommendTrails"
            :key="recommendItem.card_title"
          >
            <h3 class="h3 mb-5 text-center" :class="`text-${recommendItem.title_color}`">
              {{ recommendItem.card_title }}
            </h3>
            <div class="border rounded bg-light p-5">
              <img
                :src="getTrailImgUrl(recommendItem.trail_data.TRAILID)"
                class="card-img-top recommend__img"
                alt="trail-img"
              />
              <div class="p-0 my-5">
                <ul class="list-unstyled d-grid">
                  <li class="mb-6 d-flex">
                    <h6 class="fs-6 fw-bold me-4 mb-0">名稱</h6>
                    <p class="mb-0">
                      {{ recommendItem.trail_data.TR_CNAME }}
                    </p>
                  </li>
                  <li class="mb-6 d-flex">
                    <h6 class="fs-6 fw-bold me-4 mb-0">位置</h6>
                    <p class="mb-0 d-inline-block text-truncate recommend__text">
                      {{ recommendItem.trail_data.TR_POSITION }}
                    </p>
                  </li>
                  <li class="mb-6 d-flex">
                    <h6 class="fs-6 fw-bold me-4 mb-0">全長</h6>
                    <p class="mb-0">
                      {{ recommendItem.trail_data.TR_LENGTH }}
                    </p>
                  </li>
                </ul>
                <RouterLink
                  :to="{
                    name: 'TrailInfo',
                    params: { trail: recommendItem.trail_data.TRAILID }
                  }"
                  class="btn btn-outline-dark w-100"
                  >View</RouterLink
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { getTrailImgUrl, getImageUrl } from '@/utils/imgUrl.js'
import { recommendTrails } from '@/utils/typeFeatureUtils.js'
import { useMediaQuery } from '@vueuse/core'
import IconTitle from '@/components/front/base/IconTitle.vue'

const isMediaLgUp = useMediaQuery('(min-width: 992px)')

const gradedListInfo = {
  title: {
    isClock: false,
    title: '來去步道',
    icon: 'directions_walk',
    textColor: 'dark'
  },
  bgImg: {
    left: 'assets/illustration/person-medium--light.svg',
    right: 'assets/illustration/tree--light.svg'
  }
}
</script>
