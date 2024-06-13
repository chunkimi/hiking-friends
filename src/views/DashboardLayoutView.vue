<style lang="scss" scoped></style>

<template>
  <div id="dashboard">
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
const accountStore = useAccountStore()
const { isCheckLoginSuccess } = storeToRefs(accountStore)
const { checkLoginStatus } = accountStore
const router = useRouter()

onMounted(() => {
  checkLoginStatus()
  if (!isCheckLoginSuccess.value) {
    setTimeout(() => {
      router.push({ name: 'Login' })
    }, 500)
  }
})
</script>
