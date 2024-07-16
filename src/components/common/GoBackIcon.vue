<style lang="scss" scoped>
@import '@/styles/main.scss';

.text-reverse {
  transform: rotate(180deg);
}

.go-back-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: $dark-gray;
  color: white;
  border: none;
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover,
  &:active {
    opacity: 0.8;
  }
}
</style>
<template>
  <button class="p-0 go-back-btn" @click="goBack">
    <span class="material-icons text-reverse p-2"> logout </span>
  </button>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  return router.back()
}
</script>
