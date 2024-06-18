<style lang="scss" scoped></style>

<template>
  <div id="dashboard">
    <header class="bg-primary bg-opacity-50 py-10">
      <div class="container">
        <div v-if="isCheckLoginSuccess">
          <p class="fs-1 p-4 m-4">{{ userNickname }}</p>
          <router-link class="btn btn-success m-4" :to="navConfig.frontPath.to">{{
            navConfig.frontPath.title
          }}</router-link>
          <button class="btn btn-warning m-4" @click="handleLogout">
            {{ navConfig.logoutBtn.title }}
          </button>
        </div>
      </div>
    </header>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'

const navConfig = {
  frontPath: { title: '回到主頁', to: { name: 'FrontIndex' } },
  logoutBtn: { title: '登出' }
}
const router = useRouter()
const accountStore = useAccountStore()
const { isCheckLoginSuccess, userNickname, isLogoutSuccess } = storeToRefs(accountStore)
const { checkLoginStatus, sendLogoutRequest } = accountStore

const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)
const { sendFavListRequest } = favoriteTrailsStore

async function handleLogout() {
  await sendLogoutRequest()
  if (isLogoutSuccess.value) {
    router.push({ name: 'FrontIndex' })
  }
}

onBeforeMount(async () => {
  try {
    await checkLoginStatus()
    if (!isCheckLoginSuccess.value) {
      router.push({ name: 'Login' })
    } else {
      dashboardDataInit()
    }
  } catch (error) {
    console.error('Error during login check:', error)
  }
})

async function dashboardDataInit() {
  try {
    await sendFavListRequest()
    console.log('dashboard-favTrailsList', favTrailsListData)
  } catch (error) {
    console.error('Error dashboard request favTrailsList:', error)
  }
}
</script>
