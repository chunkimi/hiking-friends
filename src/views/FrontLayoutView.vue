<style lang="scss" scoped></style>

<template>
  <div id="front">
    <FontHeader />
    <main class="container">
      <RouterView />
    </main>
    <FontFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import FontHeader from '@/components/front/base/FontHeader.vue'
import FontFooter from '@/components/front/base/FontFooter.vue'
</script>
