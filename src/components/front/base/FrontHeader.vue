<style lang="scss" scoped>
@import '@/styles/main.scss';

.nav-link {
  color: $light;
  @include hover-link;
  &:hover,
  &:focus,
  &:active,
  &.active {
    color: $light;
  }
  @include media-breakpoint-up(lg) {
    color: $dark;
    &:hover,
    &:focus,
    &:active,
    &.active {
      color: $dark;
    }
  }
}

.navbar-toggler {
  border: 0 !important;
  &:focus {
    border: 0 !important;
    box-shadow: none !important;
  }
}
.header {
  &__p {
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
  }
  &__bgc {
    background-color: $darken;
    @include media-breakpoint-up(lg) {
      background-color: $lighter;
    }
  }
  &__brand {
    min-width: 120px;
    min-height: 36px;
    background-image: url('/icon/logo--light--sm.svg');
    @include img-replace-text;
    @include media-breakpoint-up(lg) {
      background-image: url('/icon/logo--sm.svg');
    }
  }
}

.menu {
  &__item {
    @include hover-link;
    &:after {
      @include hover-line($primary);
    }
    &:hover::after {
      width: 100%;
    }
    @include media-breakpoint-down(lg) {
      width: 100%;
    }
  }
  &__btn {
    color: $light;
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    @include media-breakpoint-up(lg) {
      width: 6.5rem;
    }
  }
}
</style>

<template>
  <header class="header__bgc header__p">
    <div class="container">
      <nav class="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
        <router-link to="/"><h2 class="header__brand">郊友趣・Hiking Friends</h2></router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list text-light fs-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="headerNavbar">
          <ul class="navbar-nav ms-auto">
            <li
              v-for="item in menuData"
              :key="item.title"
              class="nav-item pt-10 pt-lg-2 me-lg-6 text-center menu__item"
            >
              <router-link :to="item.to" class="nav-link fs-5" aria-current="page">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
          <button class="btn btn-dark menu__btn mt-10 mt-lg-0">
            <router-link to="/account" class="fs-6 link-light text-decoration-none"
              >註冊 / 登入</router-link
            >
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const menuData = [
  { title: '首頁', to: { name: 'FrontIndex' } },
  { title: '步道分級介紹', to: { name: 'TrailsIntro' } },
  { title: '探索步道', to: { name: 'TrailsList' } },
  { title: '郊友護照', to: { name: 'PassportIndex' } }
]
</script>
