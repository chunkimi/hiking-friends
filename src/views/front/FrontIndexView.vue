<style lang="scss" scoped></style>

<template>
  <div class="d-grid gap-5 bg-light-gray">
    <IndexBanner />
    <BulletinBoard />
    <FeatureList />
    <GradedList />
    <EvaluationBoard />
  </div>
</template>

<script setup>
import IndexBanner from '@/components/front/Index/IndexBanner.vue'
import BulletinBoard from '@/components/front/Index/BulletinBoard.vue'
import FeatureList from '@/components/front/Index/FeatureList.vue'
import GradedList from '@/components/front/Index/GradedList.vue'
import EvaluationBoard from '@/components/front/Index/EvaluationBoard.vue'
</script>
