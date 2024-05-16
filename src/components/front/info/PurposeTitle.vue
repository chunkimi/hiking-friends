<style lang="scss" scoped>
@import '@/styles/main.scss';
.trail-subject {
  position: relative;
  width: 100%;
  height: 75vw;
  // margin-bottom: 20rem;
  @include media-breakpoint-up(md) {
    height: 50vw;
  }
  @include media-breakpoint-up(lg) {
    margin-bottom: 0;
  }

  @include media-breakpoint-up(xl) {
    width: 45rem;
    height: 30rem;
  }
  &__head {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 80%;
    padding: 2rem 1rem;
    background-color: rgba($light, 0.9);
    @include media-breakpoint-up(lg) {
      top: 50%;
      left: 45%;
      transform: translate(50%, -50%);
      width: 60%;
    }
    @include media-breakpoint-up(xl) {
      left: 60%;
      padding: 2rem;
      width: 50%;
      height: 75%;
      background-color: $light;
    }
  }
  &__btn {
    --bs-btn-color: #fff;
  }
}
</style>
<template>
  <div class="row">
    <div class="col-lg-1"></div>
    <div class="col-12 col-lg-8">
      <div
        class="trail-subject"
        :style="{
          background: `url(${getTrailImgUrl(trailInfo.TRAILID)})` + `no-repeat center  center/cover`
        }"
      >
        <div
          class="trail-subject__head d-flex flex-column justify-content-center align-items-end align-items-xl-start"
        >
          <p class="text-secondary p-0 m-0">{{ trailInfo.TR_POSITION }}</p>
          <h2 class="h2 text-success text-end text-xl-start my-4">
            {{ trailInfo.TR_CNAME }}
          </h2>
          <ul class="list-unstyled">
            <li class="fs-6 mb-2" v-for="primaryItem in primaryInfo" :key="primaryItem.type">
              <span class="fw-bold me-2">{{ primaryItem.name }}</span>
              <span class="">{{ trailInfo[primaryItem.type] }}</span>
            </li>
          </ul>
          <button type="button" class="btn btn-primary ms-auto trail-subject__btn w-100 w-lg-25">
            加入收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getTrailImgUrl } from '@/utils/base'
defineProps({
  trailInfo: {
    type: Object,
    required: true
  }
})

const primaryInfo = [
  { type: 'TR_LENGTH', name: '步道長度' },
  { type: 'TR_TOUR', name: '遊程時間' }
]
</script>
