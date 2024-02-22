<style lang="scss" scoped>
@import '@/styles/main.scss';
.front-index {
  background-color: $light-gray;
}
.banner {
  &__wrap {
    background-image: url('/image/photo/dummy/forest_mobile.png');
    background-size: cover;
    @include media-breakpoint-up(lg) {
      background-image: url('/image/photo/dummy/forest_desktop.png');
    }
  }
  &__container {
    width: 100%;
    height: 680px;
  }
  &__brand {
    min-width: 240px;
    min-height: 72px;
    background-image: url('/icon/logo--light.svg');
    @include img-replace-text;
  }
  &__illustration {
    width: 200px;
    height: 120px;
  }
}
.search {
  &__bar {
    width: 100%;
    max-width: 312px;
    @include media-breakpoint-up(sm) {
      max-width: 596px;
    }
  }
  &__input {
    width: 100%;
    max-width: 544px;
    background-color: $light;
    border: 1px sold $dark-gray;
    border-radius: 1000px;
  }
  &__btn {
    width: 40px;
    height: 40px;
    color: $dark;
    background-color: $light-gray;
    border: 0;
    &:hover,
    &:focus,
    &:active,
    &.active {
      color: $light;
      background-color: $dark-gray;
    }
  }
}
</style>

<template>
  <div class="front-index">
    <div class="banner__wrap">
      <div
        class="container banner__container d-flex flex-column justify-content-center align-items-center"
      >
        <img
          src="/image/illustration/bn-title-mountain.svg"
          alt="illustration-mountain"
          class="banner__illustration mb-6"
        />
        <div class="ps-4 ps-lg-0 mb-6 d-flex flex-column align-items-center flex-lg-row text-light">
          <h1 class="banner__brand">郊友趣・Hiking</h1>
          <div class="d-flex flex-column align-items-center align-items-lg-start">
            <h2 class="fs-2">與自然郊友</h2>
            <h3 class="fs-5">踏上你與山林一期一會的夢幻漫遊</h3>
          </div>
        </div>
        <form class="d-flex search__bar" role="search">
          <input
            class="form-control me-3 search__input"
            type="search"
            placeholder="探索步道"
            aria-label="Search"
          />
          <button class="btn rounded-circle search__btn" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>
