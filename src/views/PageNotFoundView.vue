<style lang="scss" scoped>
.err-img {
  width: 50%;
  max-width: 400px;
}
</style>

<template>
  <div class="container py-16">
    <div class="vh-75 d-flex flex-column justify-content-center align-items-center">
      <h1 class="fs-6 brand__img brand--sm mb-8">{{ pageNotFoundConfig.pageTitle }}</h1>
      <p class="display-5 fw-bolder mb-8">{{ pageNotFoundConfig.info.mes }}</p>
      <RouterLink class="btn btn-primary mb-8" :to="pageNotFoundConfig.info.guide.to">{{
        pageNotFoundConfig.info.guide.title
      }}</RouterLink>
      <img :src="getImageUrl(pageNotFoundConfig.info.img)" alt="icon" class="err-img" />
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { getImageUrl } from '@/utils/imgUrl.js'

const pageNotFoundConfig = {
  pageTitle: '郊友趣・Hiking',
  info: {
    img: 'assets/illustration/road.png',
    mes: '哎呀！好像找不到路呢',
    guide: {
      title: '回到登山口',
      to: { name: 'FrontIndex' }
    }
  }
}
</script>
