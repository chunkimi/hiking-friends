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
      <img
        :src="getImageUrl(featureListInfo.titleIcon)"
        alt="decorate-icon"
        class="decorate-icon mx-auto"
      />
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
            :key="featureItem.icon"
          >
            <div class="h-100">
              <div class="d-flex justify-content-center mb-3">
                <img
                  :src="getImageUrl(featureItem.icon)"
                  alt="title-icon"
                  class="title-icon--circle"
                />
              </div>
              <div class="text-center d-grid gap-3">
                <h5 class="h3 py-3 mb-3" :class="`text-${featureItem.text_color}`">
                  {{ featureItem.title }}
                </h5>
                <h6 class="fs-5 text-secondary">{{ featureItem.subtitle }}</h6>
                <p class="text-secondary fs-6" v-html="getKeywordHtml(featureItem.keyword)"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getImageUrl } from '@/utils/base'
import { useMediaQuery } from '@vueuse/core'
const isMediaLgUp = useMediaQuery('(min-width: 992px)')

import mokuIcon from '@/assets/illustration/moku--light.svg'

const featureListInfo = {
  bgImg: mokuIcon,
  titleIcon: 'assets/illustration/acorn.svg'
}

const featureData = [
  {
    title: '主題分類檢索',
    subtitle: '掌握目標下腳快、狠、準',
    keyword: ['地區瀏覽', '步道分級', '預估時程', '步道類型'],
    text_color: 'primary',
    icon: 'assets/icons/picture.svg'
  },
  {
    title: '步道履歷報你知',
    subtitle: '資訊整合，一目瞭然',
    keyword: ['步道介紹', '路程預估', '景點推薦', '開放情況'],
    text_color: 'success',
    icon: 'assets/icons/location.svg'
  },
  {
    title: '郊友護照',
    subtitle: '會員專屬個人步道筆記',
    keyword: ['待訪清單', '攻略紀錄'],
    text_color: 'warning',
    icon: 'assets/icons/hiker.svg'
  },
  {
    title: '郊友分享',
    subtitle: '今天去哪兒？',
    keyword: ['熱門首選', '心得郊流'],
    text_color: 'danger',
    icon: 'assets/icons/group.svg'
  }
]

function getKeywordHtml(data) {
  let result = ''
  data.forEach((item, index) => {
    let raw = `<span class="p-2">${item}</span>`
    if (index % 2 !== 0) {
      raw += '<br />'
    }
    result += raw
  })
  return result
}
</script>
