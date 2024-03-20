<style lang="scss" scoped></style>

<template>
  <TopicTitle
    :title="typeListInfo.title"
    :icon="typeListInfo.icon"
    :circleType="typeListInfo.circleType"
  ></TopicTitle>
  <ul class="list-unstyled m-0">
    <li v-for="typeItem in typeData" :key="typeItem"></li>
  </ul>
</template>

<script setup>
import TopicTitle from '@/components/front/base/TopicTitle.vue'

const typeListInfo = {
  title: '步道系統',
  icon: 'landscape',
  circleType: 'sunshine'
}

const typeData = [
  {
    trail: '國家步道',
    icon: 'forest'
  },
  {
    trail: '區域步道',
    icon: 'park'
  },
  {
    trail: '其他步道',
    icon: 'grass'
  }
]
</script>
