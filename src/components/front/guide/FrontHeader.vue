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
    width: 120px;
    height: 36px;
    @include img-replace-text;
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
        <router-link to="/"
          ><h2
            class="brand__img brand__sm"
            :style="{
              backgroundImage: isMediaLgUp
                ? `url(${headerInfo.logo})`
                : `url(${headerInfo.logoLight})`
            }"
          >
            {{ menuTitle.indexTitle }}
          </h2></router-link
        >

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
              <router-link
                :to="item.to"
                class="nav-link fs-5"
                aria-current="page"
                v-if="item.to.name === 'TrailsList'"
                @click="reloadList"
              >
                {{ item.title }}
              </router-link>
              <router-link :to="item.to" class="nav-link fs-5" aria-current="page" v-else>
                {{ item.title }}
              </router-link>
            </li>
          </ul>
          <button class="btn btn-dark menu__btn mt-10 mt-lg-0">
            <router-link to="/account" class="fs-6 link-light text-decoration-none">{{
              menuTitle.account
            }}</router-link>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'

import { useMediaQuery } from '@vueuse/core'
const isMediaLgUp = useMediaQuery('(min-width: 992px)')

import logo from '@/assets/logo/logo--sm.svg'
import logoLight from '@/assets/logo/logo--light--sm.svg'

const headerInfo = {
  logo,
  logoLight
}

const route = useRoute()
const trailsListStore = useTrailsListStore()
const { isListAlready, isSavePage, isTypeToSearch } = storeToRefs(trailsListStore)

function reloadList() {
  const currentRoute = route.fullPath
  if (currentRoute.includes('trails-list') && isListAlready) {
    isListAlready.value = false
    window.location.reload()
  }
  if (!currentRoute.includes('trails-list')) {
    isSavePage.value = false
  }
  if (currentRoute.includes('trails-intro')) {
    isTypeToSearch.value = false
  }
}

const menuTitle = {
  indexTitle: '郊友趣・Hiking Friends',
  account: '註冊 / 登入'
}

const menuData = [
  { title: '首頁', to: { name: 'FrontIndex' } },
  { title: '主題分級', to: { name: 'TrailsIntro' } },
  { title: '探索步道', to: { name: 'TrailsList' } },
  { title: '郊友護照', to: { name: 'PassportIndex' } }
]
</script>
