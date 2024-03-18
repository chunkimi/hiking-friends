<style lang="scss" scoped></style>

<template>
  <div id="front">
    <FrontHeader />
    <main>
      <RouterView />
    </main>
    <FrontFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import FrontHeader from '@/components/front/base/FrontHeader.vue'
import FrontFooter from '@/components/front/base/FrontFooter.vue'
</script>
