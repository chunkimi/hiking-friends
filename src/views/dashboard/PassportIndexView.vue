<style lang="scss" scoped></style>

<template>
  <p class="fs-1">會員護照</p>
  <p class="fs-1">{{ userNickname }}</p>
  <p>{{ isCheckLoginSuccess }}</p>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
const accountStore = useAccountStore()
const { userNickname, isCheckLoginSuccess } = storeToRefs(accountStore)
</script>
