<style lang="scss" scoped>
@import '@/styles/main.scss';
.banner {
  &__wrap {
    background-image: url('/image/photo/hiker.jpeg');
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
    background-image: url('/icon/logo--light.svg');
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
  <div class="banner__wrap">
    <div class="container">
      <div class="banner__container d-flex flex-column justify-content-center align-items-center">
        <img
          src="/image/illustration/bn-title-mountain.svg"
          alt="illustration-mountain"
          class="banner__illustration mb-6"
        />
        <div class="ps-4 ps-lg-0 mb-6 d-flex flex-column align-items-center flex-lg-row text-light">
          <h1 class="banner__brand">郊友趣・Hiking</h1>
          <div class="d-flex flex-column align-items-center align-items-lg-start ms-0 ms-lg-8">
            <h2 class="fs-2 banner__text">{{ sloganData.main }}</h2>
            <h3 class="fs-5 banner__text">{{ sloganData.vice }}</h3>
          </div>
        </div>
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../base/SearchBar.vue'
const sloganData = {
  main: '與自然郊友',
  vice: '踏上你與山林一期一會的夢幻漫遊'
}
</script>
