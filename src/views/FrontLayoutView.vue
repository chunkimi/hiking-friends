<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>

<template>
  <div id="front">
    <FrontHeader />
    <main class="bg-light-gray">
      <div v-if="isOpenLoading">
        <LoadingSpinner />
      </div>
      <div v-else><RouterView /></div>
    </main>
    <FrontFooter />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import FrontHeader from '@/components/front/guide/FrontHeader.vue'
import FrontFooter from '@/components/front/guide/FrontFooter.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const trailsListStore = useTrailsListStore()
const { isDataInitSuccess } = storeToRefs(trailsListStore)
const { sendTrailsInfoRequest, sendTrailsConditionRequest } = trailsListStore

const isOpenLoading = ref(true)

onMounted(async () => {
  isOpenLoading.value = true
  await sendTrailsInfoRequest()
  await sendTrailsConditionRequest()
  if (isDataInitSuccess.value) {
    isOpenLoading.value = false
  }
})
</script>
