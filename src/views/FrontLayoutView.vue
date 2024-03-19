<style lang="scss" scoped>
@import '@/styles/main.scss';
.front-bgc {
  background-color: $light-gray;
}
</style>

<template>
  <div id="front" class="front-bgc">
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
