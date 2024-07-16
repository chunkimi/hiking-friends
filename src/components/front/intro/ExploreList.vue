<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>
<template>
  <div>
    <IconTitle
      :is-clock-line="exploreListTitle.isClock"
      :icon="exploreListTitle.icon"
      :title-text="exploreListTitle.title"
      :color="exploreListTitle.textColor"
      class="icon-title-spacing"
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
  </div>
</template>
<script setup>
import { exploreGuideData } from '@/utils/typeFeatureUtils.js'
import IconTitle from '@/components/front/base/IconTitle.vue'
import TypeCard from '@/components/front/base/TypeCard.vue'
const exploreListTitle = {
  isClock: false,
  title: '分類探索',
  icon: 'explore',
  textColor: 'dark'
}

const isKeywordLink = true
</script>
