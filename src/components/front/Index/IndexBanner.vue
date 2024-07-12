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
            {{ bannerConfig.pageTitle }}
          </h1>
          <div class="d-flex flex-column align-items-center align-items-lg-start ms-0 ms-lg-8">
            <h2 class="fs-2 banner__text">{{ bannerConfig.slogan.main }}</h2>
            <h3 class="fs-5 banner__text">{{ bannerConfig.slogan.vice }}</h3>
          </div>
        </div>
        <SearchBar :has-reset-btn="bannerConfig.hasResetBtn" @search-data="searchToList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { getImageUrl } from '@/utils/imgUrl.js'
import SearchBar from '@/components/front/base/SearchBar.vue'
import hikerIcon from '@/assets/bg-img/hiker.jpeg'
import logoImg from '@/assets/logo/logo--light.svg'

const bannerConfig = {
  pageTitle: '郊友趣・Hiking',
  slogan: {
    main: '與自然郊友',
    vice: '踏上你與山林一期一會的夢幻漫遊'
  },
  logoImg,
  bgImg: hikerIcon,
  bannerIcon: 'assets/illustration/bn-title-mountain.svg',
  hasResetBtn: false
}
const bannerSetting = {
  logoImg,
  bgImg: hikerIcon,
  bannerIcon: 'assets/illustration/bn-title-mountain.svg'
}

const router = useRouter()
const trailsListStore = useTrailsListStore()
const { isSearchByOutside, searchKeyword, searchType } = storeToRefs(trailsListStore)

function searchToList(queryValue) {
  if (queryValue.length !== 0) {
    searchKeyword.value = queryValue
    searchType.value = 'all'
    isSearchByOutside.value = true
    router.push({ name: 'TrailsList' })
  }
}
</script>
