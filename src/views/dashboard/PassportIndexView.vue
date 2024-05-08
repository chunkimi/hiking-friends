<style lang="scss" scoped></style>

<template>
  <p>UserHomeView</p>
  <div class="mb-8">
    <IconTitle
      :is-clock-line="clockIconTitle.isClock"
      :icon="clockIconTitle.icon"
      :color="clockIconTitle.textColor"
      :title-text="clockIconTitle.title"
    ></IconTitle>
  </div>
  <div class="mb-8">
    <IconTitle
      :is-clock-line="sunIconTitle.isClock"
      :icon="sunIconTitle.icon"
      :color="sunIconTitle.textColor"
      :title-text="sunIconTitle.title"
    ></IconTitle>
  </div>
</template>

<script setup>
import IconTitle from '@/components/front/base/IconTitle.vue'
const clockIconTitle = {
  isClock: true,
  title: '時鐘圖示',
  icon: 'hiking',
  textColor: 'warning'
}
const sunIconTitle = {
  isClock: false,
  title: '太陽圖示',
  icon: 'flight_takeoff',
  textColor: 'secondary'
}
</script>
