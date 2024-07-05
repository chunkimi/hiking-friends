<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>
<template>
  <IconTitle
    :is-clock-line="exploreListTitle.isClock"
    :icon="exploreListTitle.icon"
    :title-text="exploreListTitle.title"
    :color="exploreListTitle.textColor"
    class="mb-10"
  ></IconTitle>
  <ul class="row list-unstyled">
    <li
      class="col-12 col-lg-4"
      v-for="exploreGuideItem in exploreGuideData"
      :key="exploreGuideItem.title.icon"
    >
      <TypeCard :card-item="exploreGuideItem" :is-keyword-link="isKeywordLink" />
    </li>
  </ul>
</template>
<script setup>
import IconTitle from '@/components/front/base/IconTitle.vue'
import TypeCard from '@/components/front/base/TypeCard.vue'
const exploreListTitle = {
  isClock: false,
  title: '分類探索',
  icon: 'explore',
  textColor: 'dark'
}

const exploreGuideData = [
  {
    title: {
      isClock: true,
      title: '臺灣各地',
      icon: 'map',
      textColor: 'primary'
    },
    subtitle: '選擇心儀的目的區域',
    // keywords: ['北部地區', '中部地區', '南部地區', '東部地區']
    keywords: [
      { title: '北部地區', queryType: 'trailArea', queryValue: '北部' },
      { title: '中部地區', queryType: 'trailArea', queryValue: '中部' },
      { title: '南部地區', queryType: 'trailArea', queryValue: '南部' },
      { title: '東部地區', queryType: 'trailArea', queryValue: '東部' }
    ]
  },
  {
    title: {
      isClock: true,
      title: '分類系統',
      icon: 'mode_of_travel',
      textColor: 'info'
    },
    subtitle: '探索不同類型與定位',
    // keywords: ['國家步道', '區域步道']
    keywords: [
      { title: '國家步道', queryType: 'trailSys', queryValue: '國家步道' },
      { title: '區域步道', queryType: 'trailSys', queryValue: '區域步道' }
    ]
  },
  {
    title: {
      isClock: true,
      title: '時程導向',
      icon: 'hiking',
      textColor: 'warning'
    },
    subtitle: '根據時間計畫選擇理想步道',
    // keywords: ['半天遊程', '一天鍛鍊', '多天挑戰']
    keywords: [
      { title: '半天遊程', queryType: 'trailTour', queryValue: '半天' },
      { title: '一天鍛鍊', queryType: 'trailTour', queryValue: '一天' },
      { title: '多天挑戰', queryType: 'trailTour', queryValue: '多天' }
    ]
  }
]
const isKeywordLink = true
</script>
