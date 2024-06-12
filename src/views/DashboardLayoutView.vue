<style lang="scss" scoped></style>

<template>
  <div id="dashboard">
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import { onMounted } from 'vue'
import { useAccountStore } from '@/stores/useAccountStore.js'
const accountStore = useAccountStore()
const { checkLoginStatus } = accountStore

onMounted(() => {
  checkLoginStatus()
})
</script>
