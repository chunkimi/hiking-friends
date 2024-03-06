<style lang="scss" scoped>
@import '@/styles/main.scss';

.tour-list {
  &__wrap {
    &--right {
      background-image: none;
      @include media-breakpoint-up(lg) {
        background-image: url('/image/illustration/tree.svg');
        background-repeat: no-repeat;
        background-size: auto;
        background-position: calc(100% - $bg-spacer) bottom;
      }
    }
    &--left {
      background-image: none;
      @include media-breakpoint-up(lg) {
        background-image: url('/image/illustration/person.svg');
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
}
</style>
<template>
  <div class="tour-list__wrap--left my-15">
    <div class="tour-list__wrap--right">
      <div class="container">
        <div class="d-flex flex-column justify-content-center align-items-center mb-10">
          <img
            :src="getImageUrl('assets/icons/person.svg')"
            alt="title-icon"
            class="title-icon--semicircle mb-2"
          />
          <h3 class="fs-6 fw-bold">來去步道</h3>
        </div>
        <div class="row">
          <div
            class="col-12 col-lg-4"
            v-for="recommendItem in recommendTrails"
            :key="recommendItem.card_title"
          >
            <h3 class="h3 mb-5 text-center" :class="`text-${recommendItem.title_color}`">
              {{ recommendItem.card_title }}
            </h3>
            <div class="card p-5">
              <img
                :src="getImageUrl(turnTrailImgPath(recommendItem.trail_data.TR_IMG_NUM))"
                class="card-img-top recommend__img"
                alt="trail-img"
              />
              <div class="card-body p-0 my-5">
                <ul class="list-unstyled d-grid gap-6">
                  <li>
                    <p class="card-text">
                      <span class="fs-6 fw-bold me-4">名稱</span
                      >{{ recommendItem.trail_data.TR_CNAME }}
                    </p>
                  </li>
                  <li>
                    <p class="card-text">
                      <span class="fs-6 fw-bold me-4">位置</span
                      >{{ recommendItem.trail_data.TR_POSITION }}
                    </p>
                  </li>
                  <li>
                    <p class="card-text">
                      <span class="fs-6 fw-bold me-4">全長</span
                      >{{ recommendItem.trail_data.TR_LENGTH }}
                    </p>
                  </li>
                </ul>
                <a href="#" class="btn btn-outline-dark w-100">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getImageUrl, turnTrailImgPath } from '@/utils/base'
const recommendTrails = [
  {
    card_title: '新手入門',
    title_color: 'success',
    trail_data: {
      TRAILID: '003',
      TR_CNAME: '新店獅頭山步道',
      TR_POSITION: '新北市新店區',
      TR_LENGTH: '0.8公里',
      TR_IMG_NUM: '003'
    }
  },
  {
    card_title: '來點挑戰',
    title_color: 'danger',
    trail_data: {
      TRAILID: '007',
      TR_CNAME: '礁溪跑馬古道',
      TR_POSITION: '新北市坪林區、宜蘭縣礁溪鄉、宜蘭縣頭城鎮',
      TR_LENGTH: '6.7公里',
      TR_IMG_NUM: '007'
    }
  },
  {
    card_title: '進階探險',
    title_color: 'warning',
    trail_data: {
      TRAILID: '139',
      TR_CNAME: '嘉明湖國家步道',
      TR_POSITION: '台東縣海端鄉',
      TR_LENGTH: '13公里',
      TR_IMG_NUM: '139'
    }
  }
]
</script>
