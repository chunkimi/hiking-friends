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

const isKeywordLink = true

const exploreGuideData = [
  {
    title: {
      isClock: true,
      title: '臺灣各地',
      icon: 'map',
      textColor: 'primary'
    },
    subtitle: '選擇心儀的目的區域',
    keywords: ['北部區域', '中部區域', '南部區域', '東部區域']
  },
  {
    title: {
      isClock: true,
      title: '分類系統',
      icon: 'mode_of_travel',
      textColor: 'info'
    },
    subtitle: '探索不同類型與定位',
    keywords: ['國家級步道', '區域步道']
  },
  {
    title: {
      isClock: true,
      title: '時程導向',
      icon: 'hiking',
      textColor: 'warning'
    },
    subtitle: '根據時間計畫選擇理想步道',
    keywords: ['半日遊程', '一日鍛鍊', '多日挑戰']
  }
]
</script>
