<style lang="scss" scoped></style>

<template>
  <div class="d-flex flex-column align-items-center">
    <TopicTitle
      :title="typeListInfo.title"
      :icon="typeListInfo.icon"
      :circleType="typeListInfo.circleType"
      class="ps-4"
    ></TopicTitle>
    <ul class="list-unstyled m-0 mt-3">
      <li v-for="typeItem in typeData" :key="typeItem" class="p-2 mb-2">
        <p class="fs-6 d-flex align-items-center m-0">
          <span class="material-icons-outlined text-secondary me-2">{{ typeItem.icon }}</span>
          <span>{{ typeItem.trail }}</span>
        </p>
      </li>
    </ul>
  </div>
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
