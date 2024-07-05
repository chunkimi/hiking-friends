<style lang="scss" scoped>
.text-reverse {
  transform: rotate(180deg);
}
</style>
s
<template>
  <a class="link-secondary text-decoration-none" @click="goBack"
    ><span class="material-icons text-reverse"> logout </span></a
  >
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  return router.back()
}
</script>
