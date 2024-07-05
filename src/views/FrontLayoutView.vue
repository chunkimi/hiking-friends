<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>

<template>
  <div id="front">
    <FrontHeader />
    <main class="bg-light-gray">
      <RouterView />
    </main>
    <FrontFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import FrontHeader from '@/components/front/guide/FrontHeader.vue'
import FrontFooter from '@/components/front/guide/FrontFooter.vue'
</script>
