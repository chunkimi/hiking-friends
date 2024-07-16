<style lang="scss" scoped>
@import '@/styles/main.scss';
.decorate-icon {
  width: 88px;
  @include media-breakpoint-up(lg) {
    width: 196px;
  }
}
.feature-list {
  &__wrap {
    @include media-breakpoint-up(lg) {
      background-repeat: no-repeat;
      background-size: contain;
      background-position: calc(100% - $bg-spacer) bottom;
    }
  }
  &__content {
    &:nth-last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
<template>
  <div>
    <div class="container mb-20">
      <div class="text-center">
        <img
          :src="getImageUrl(featureListInfo.titleIcon)"
          alt="decorate-icon"
          class="decorate-icon"
        />
      </div>
    </div>
    <div
      class="feature-list__wrap"
      :style="{
        backgroundImage: isMediaLgUp ? `url(${getImageUrl(featureListInfo.bgImg)})` : 'none'
      }"
    >
      <div class="container">
        <ul class="list-unstyled row feature-list__content">
          <li
            class="col-12 col-lg-3 mb-10 mb-lg-0"
            v-for="featureItem in featureData"
            :key="featureItem.title.icon"
          >
            <TypeCard :card-item="featureItem" :is-keyword-link="isKeywordLink" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import TypeCard from '@/components/front/base/TypeCard.vue'
import { featureData } from '@/utils/typeFeatureUtils.js'
import { getImageUrl } from '@/utils/imgUrl.js'
import { useMediaQuery } from '@vueuse/core'
const isMediaLgUp = useMediaQuery('(min-width: 992px)')

const featureListInfo = {
  bgImg: 'assets/illustration/moku--light.svg',
  titleIcon: 'assets/illustration/acorn.svg'
}

const isKeywordLink = false
</script>
