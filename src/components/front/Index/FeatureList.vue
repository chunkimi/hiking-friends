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
    <div class="container mb-5">
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
      :style="{ backgroundImage: isMediaLgUp ? `url(${featureListInfo.bgImg})` : 'none' }"
    >
      <div class="container py-1">
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

import { getImageUrl } from '@/utils/imgUrl.js'
import { useMediaQuery } from '@vueuse/core'
const isMediaLgUp = useMediaQuery('(min-width: 992px)')

import mokuIcon from '@/assets/illustration/moku--light.svg'

const featureListInfo = {
  bgImg: mokuIcon,
  titleIcon: 'assets/illustration/acorn.svg'
}

const isKeywordLink = false

const featureData = [
  {
    title: {
      isClock: true,
      title: '主題分類檢索',
      icon: 'landscape',
      textColor: 'primary'
    },
    subtitle: '掌握目標下腳快、狠、準',
    keywords: ['地區瀏覽', '步道分級', '預估時程', '步道類型']
  },
  {
    title: {
      isClock: true,
      title: '步道履歷報你知',
      icon: 'mode_of_travel',
      textColor: 'success'
    },
    subtitle: '資訊整合，一目瞭然',
    keywords: ['步道介紹', '路程預估', '景點推薦', '開放情況']
  },
  {
    title: {
      isClock: true,
      title: '郊友護照',
      icon: 'hiking',
      textColor: 'warning'
    },
    subtitle: '會員專屬個人步道筆記',
    keywords: ['待訪清單', '攻略紀錄']
  },
  {
    title: {
      isClock: true,
      title: '郊友分享',
      icon: 'diversity_3',
      textColor: 'danger'
    },
    subtitle: '今天去哪兒？熱門首選推薦',
    keywords: ['開發中']
  }
]
</script>
@/utils/imgUrl
