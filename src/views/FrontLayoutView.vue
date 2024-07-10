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
// import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
// import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import FrontHeader from '@/components/front/guide/FrontHeader.vue'
import FrontFooter from '@/components/front/guide/FrontFooter.vue'

// const trailsListStore = useTrailsListStore()
// const { sendTrailsInfoRequest, sendTrailsConditionRequest } = trailsListStore

// onBeforeMount(async () => {
//   await sendTrailsInfoRequest()
//   await sendTrailsConditionRequest()
// })
</script>
