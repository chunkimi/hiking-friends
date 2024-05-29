<style lang="scss" scoped>
@import '@/styles/main.scss';
.banner {
  &__wrap {
    background-size: cover;
    background-position: center right;
    @include media-breakpoint-up(md) {
      background-position: center center;
    }
  }
  &__container {
    width: 100%;
    height: 680px;
  }
  &__brand {
    width: 240px;
    height: 72px;
    @include img-replace-text;
  }
  &__text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  &__illustration {
    width: 200px;
    height: 120px;
  }
}
</style>

<template>
  <div class="banner__wrap" :style="{ backgroundImage: `url(${bannerSetting.bgImg})` }">
    <div class="container">
      <div class="banner__container d-flex flex-column justify-content-center align-items-center">
        <img
          :src="getImageUrl(bannerSetting.bannerIcon)"
          alt="illustration-mountain"
          class="banner__illustration mb-6"
        />
        <div class="ps-4 ps-lg-0 mb-6 d-flex flex-column align-items-center flex-lg-row text-light">
          <h1 class="banner__brand" :style="{ backgroundImage: `url(${bannerSetting.logoImg})` }">
            郊友趣・Hiking
          </h1>
          <div class="d-flex flex-column align-items-center align-items-lg-start ms-0 ms-lg-8">
            <h2 class="fs-2 banner__text">{{ bannerSetting.main }}</h2>
            <h3 class="fs-5 banner__text">{{ bannerSetting.vice }}</h3>
          </div>
        </div>
        <SearchBar :has-reset-btn="bannerSetting.hasResetBtn" @search-data="searchToList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/base'
import SearchBar from '@/components/front/base/SearchBar.vue'
import hikerIcon from '@/assets/bg-img/hiker.jpeg'
import logoImg from '@/assets/logo/logo--light.svg'
const bannerSetting = {
  main: '與自然郊友',
  vice: '踏上你與山林一期一會的夢幻漫遊',
  logoImg,
  bgImg: hikerIcon,
  bannerIcon: 'assets/illustration/bn-title-mountain.svg',
  hasResetBtn: false
}

const router = useRouter()
function searchToList(queryValue) {
  if (queryValue.length !== 0) {
    sessionStorage.setItem('outerToSearch', true)
    router.push({ name: 'TrailsList', query: { queryValue } })
  }
}
</script>
