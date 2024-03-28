<style lang="scss" scoped></style>

<template>
  <div class="d-flex flex-column align-items-center">
    <TopicTitle
      :title="tourListInfo.title"
      :icon="tourListInfo.icon"
      :circleType="tourListInfo.circleType"
      class="ps-4"
    ></TopicTitle>
    <ul class="list-unstyled m-0 mt-3">
      <li v-for="tourItem in tourData" :key="tourItem.icon" class="p-2 mb-2">
        <a href="/" class="fs-6 d-flex align-items-center m-0 link-darken text-decoration-none">
          <span class="material-icons-outlined text-secondary me-2">{{ tourItem.icon }}</span>
          <span>{{ tourItem.time }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import TopicTitle from '@/components/front/base/TopicTitle.vue'

const tourListInfo = {
  title: '路程分類',
  icon: 'tour',
  circleType: 'sunshine'
}

const tourData = [
  {
    time: '半日遊',
    icon: 'emoji_nature'
  },
  {
    time: '一日遊',
    icon: 'hiking'
  },
  {
    time: '多日行',
    icon: 'cabin'
  }
]
</script>
