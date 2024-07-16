<style lang="scss" scoped></style>

<template>
  <IndexBanner />
  <div class="block-spacing">
    <BulletinBoard />
    <FeatureList />
    <GradedList />
  </div>
  <EvaluationBoard />
</template>

<script setup>
import IndexBanner from '@/components/front/Index/IndexBanner.vue'
import BulletinBoard from '@/components/front/Index/BulletinBoard.vue'
import FeatureList from '@/components/front/Index/FeatureList.vue'
import GradedList from '@/components/front/Index/GradedList.vue'
import EvaluationBoard from '@/components/front/Index/EvaluationBoard.vue'
</script>
