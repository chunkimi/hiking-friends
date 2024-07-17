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
    width: 85vw;
    @include media-breakpoint-up(sm) {
      width: 100%;
    }
  }
  &__btn {
    width: 100%;
    @include media-breakpoint-up(lg) {
      width: 94px;
    }
  }
}
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-3">
        <IconTitle
          :is-clock-line="bulletinTitle.isClock"
          :icon="bulletinTitle.icon"
          :color="bulletinTitle.textColor"
          :title-text="bulletinTitle.title"
          class="icon-title-spacing mb-lg-0"
        />
      </div>
      <div class="col-12 col-lg-9">
        <ul class="list-unstyled">
          <li class="row mb-6 fs-6" v-for="newsItem in trailsNews" :key="newsItem.TRAILID">
            <div class="col-12 col-lg-2">
              <h4 class="fs-6 fw-bold text-center lh-1 news__sign" :class="newsItem.text_style">
                {{ newsItem.TR_TYP }}
              </h4>
            </div>
            <div class="col-12 col-lg-3">
              <h5 class="fs-6 fw-bold lh-1 text-center news__title">
                {{ newsItem.TR_CNAME }}
              </h5>
            </div>
            <div class="col-12 col-lg-7">
              <p class="fs-6 lh-1 py-1 text-truncate news__text">{{ newsItem.TITLE }}</p>
            </div>
          </li>
        </ul>
        <div class="text-lg-end">
          <RouterLink :to="linkToReadMore.to" class="btn btn-dark me-auto news__btn">{{
            linkToReadMore.title
          }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { newsType } from '@/utils/trailInfoUtils.js'
import IconTitle from '@/components/front/base/IconTitle.vue'

const trailsListStore = useTrailsListStore()
const { allTrailsConditionData } = storeToRefs(trailsListStore)

const bulletinTitle = {
  isClock: false,
  title: '路況即時報',
  icon: 'campaign',
  textColor: 'dark'
}

const linkToReadMore = {
  title: 'More+',
  to: { name: 'TrailConditionReport' }
}

const trailsNews = computed(() => {
  let result = []

  newsType.forEach((item) => {
    let raw = allTrailsConditionData.value.find((element) => element['TR_TYP'] == item.msg)
    if (raw) {
      raw.text_style = `news__sign--${item.color}`
      result.push(raw)
    }
  })

  return result
})
</script>
