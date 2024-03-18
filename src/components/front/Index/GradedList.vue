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
    class="tour-list__wrap--left my-15"
    :style="{ backgroundImage: isDesktop ? `url(${gradedListInfo.bgImg.left})` : 'none' }"
  >
    <div
      class="tour-list__wrap--right"
      :style="{ backgroundImage: isDesktop ? `url(${gradedListInfo.bgImg.right})` : 'none' }"
    >
      <div class="container">
        <div class="d-flex flex-column justify-content-center align-items-center mb-10">
          <img
            :src="getImageUrl(gradedListInfo.titleIcon)"
            alt="title-icon"
            class="title-icon--semicircle mb-2"
          />
          <h3 class="fs-6 fw-bold">{{ gradedListInfo.title }}</h3>
        </div>
        <ul class="list-unstyled row">
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
                :src="getImageUrl(turnTrailImgPath(recommendItem.trail_data.TRAILID))"
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
                <a href="#" class="btn btn-outline-dark w-100">View</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getImageUrl, turnTrailImgPath } from '@/utils/base'
import treeIcon from '@/assets/illustration/tree.svg'
import personIcon from '@/assets/illustration/person.svg'

import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 992px)')

const gradedListInfo = {
  title: '來去步道',
  titleIcon: 'assets/icons/person.svg',
  bgImg: {
    left: personIcon,
    right: treeIcon
  }
}
const recommendTrails = [
  {
    card_title: '新手入門',
    title_color: 'success',
    trail_data: {
      TRAILID: '003',
      TR_CNAME: '新店獅頭山步道',
      TR_POSITION: '新北市新店區',
      TR_LENGTH: '0.8公里'
    }
  },
  {
    card_title: '來點挑戰',
    title_color: 'danger',
    trail_data: {
      TRAILID: '007',
      TR_CNAME: '礁溪跑馬古道',
      TR_POSITION: '新北市坪林區、宜蘭縣礁溪鄉、宜蘭縣頭城鎮',
      TR_LENGTH: '6.7公里'
    }
  },
  {
    card_title: '進階探險',
    title_color: 'warning',
    trail_data: {
      TRAILID: '139',
      TR_CNAME: '嘉明湖國家步道',
      TR_POSITION: '台東縣海端鄉',
      TR_LENGTH: '13公里'
    }
  }
]
</script>
