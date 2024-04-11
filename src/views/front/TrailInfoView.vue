<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div>123456789</div>
    <div>{{ year }}</div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const year = route.params.trail
</script>
