<style lang="scss" scoped>
@import '@/styles/main.scss';
.front-index {
  background-color: $light-gray;
}
</style>

<template>
  <div class="front-index">
    <IndexBanner />
  </div>
</template>

<script setup>
import IndexBanner from '@/components/front/Index/IndexBanner.vue'
</script>
