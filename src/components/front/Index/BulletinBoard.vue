<style lang="scss" scoped>
@import '@/styles/main.scss';
.news {
  &__sign {
    padding: 4px 16px;
    border-radius: 1000px;
    &--danger {
      color: $light;
      background-color: $danger;
      @include media-breakpoint-up(lg) {
        color: $danger;
        background-color: $light;
      }
    }
    &--secondary {
      color: $light;
      background-color: $secondary;
      @include media-breakpoint-up(lg) {
        color: $secondary;
        background-color: $light;
      }
    }
    &--warning {
      color: $light;
      background-color: $warning;
      @include media-breakpoint-up(lg) {
        color: $warning;
        background-color: $light;
      }
    }
  }
  &__title {
    background-color: $light;
    padding: 4px 0px;
    border-radius: 1000px;
    @include media-breakpoint-up(lg) {
      background-color: transparent;
    }
  }
  &__text {
    padding: 4px 0px;
    text-align: center;
    @include text-toBeContinued;
    @include media-breakpoint-up(lg) {
      text-align: start;
    }
  }
  &__btn {
    width: 94px;
    @include media-breakpoint-down(lg) {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="container">
    <div class="row pt-14 pb-16 pt-lg-16">
      <div
        class="col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center mb-20 mb-lg-0"
      >
        <img src="/icon/title/sign.svg" alt="title-icon" class="title-icon--semicircle mb-2" />
        <h3 class="fs-6 fw-bold">路況即時報</h3>
      </div>
      <div class="col-12 col-lg-9">
        <ul class="list-unstyled">
          <li class="row mb-6 fs-6" v-for="newsItem in trailsNews" :key="newsItem.TRAILID">
            <div class="col-12 col-lg-2">
              <h4
                class="fs-6 fw-bold text-center lh-1 news__sign news__sign--danger"
                :class="newsItem.text_style"
              >
                {{ newsItem.TR_TYP }}
              </h4>
            </div>
            <div class="col-12 col-lg-3">
              <h5 class="fs-6 fw-bold lh-1 text-center news__title">
                {{ newsItem.TR_CNAME }}
              </h5>
            </div>
            <div class="col-12 col-lg-7">
              <p class="fs-6 lh-1 news__text">{{ newsItem.TITLE }}</p>
            </div>
          </li>
        </ul>
        <div class="text-lg-end">
          <button type="button" class="btn btn-dark me-auto news__btn">More ＋</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import dummyAllTrailsNews from '@/data/dummy/allTrailsNews.json'

const newsType = [
  {
    mes: '注意',
    color: 'warning'
  },
  {
    mes: '部分封閉',
    color: 'secondary'
  },
  {
    mes: '暫停開放',
    color: 'danger'
  }
]

const trailsNews = computed(() => {
  let result = []

  newsType.forEach((item) => {
    let raw = dummyAllTrailsNews.find((element) => element['TR_TYP'] == item.mes)
    raw.text_style = `news__sign--${item.color}`
    console.log(raw)
    result.push(raw)
  })

  return result
})
</script>
