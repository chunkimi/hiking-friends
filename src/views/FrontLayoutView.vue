<style lang="scss" scoped></style>

<template>
  <div id="front">
    <HeaderComponent />
    <div class="container">
      <RouterView />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/front/base/HeaderComponent.vue'
import FooterComponent from '@/components/front/base/FooterComponent.vue'
</script>
