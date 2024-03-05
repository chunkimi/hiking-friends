<style lang="scss" scoped>
@import '@/styles/main.scss';
.front-index {
  background-color: $light-gray;
}
</style>

<template>
  <div class="front-index d-grid gap-5">
    <IndexBanner />
    <BulletinBoard />
    <FeatureList />
  </div>
</template>

<script setup>
import IndexBanner from '@/components/front/Index/IndexBanner.vue'
import BulletinBoard from '@/components/front/Index/BulletinBoard.vue'
import FeatureList from '@/components/front/Index/FeatureList.vue'
</script>
