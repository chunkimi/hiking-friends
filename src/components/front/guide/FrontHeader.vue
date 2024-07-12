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
.btn-outline-secondary {
  --bs-btn-hover-color: #fff;
  --bs-btn-active-color: #fff;
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
                ? `url(${getImageUrl(headerInfo.logo)})`
                : `url(${getImageUrl(headerInfo.logoLight)})`
            }"
          >
            {{ menuConfig.indexTitle }}
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
        <div class="collapse navbar-collapse" id="headerNavbar" ref="navbarCollapse">
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
                @click="handleNavLinkClick(item.to)"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ul>
          <div class="mt-10 mt-lg-0 pt-lg-2">
            <div
              v-if="isCheckLoginSuccess"
              class="d-flex justify-content-center align-items-center"
            >
              <p
                class="fw-bold p-0 m-0 me-3 d-flex justify-content-center"
                :class="isMediaLgUp ? ['text-success'] : ['text-light']"
              >
                <span class="material-icons"> face </span>
                <span class="ms-1"> {{ userNickname }}</span>
              </p>
              <button
                type="button"
                class="btn btn-sm"
                :class="isMediaLgUp ? ['btn-outline-secondary'] : ['btn-outline-light']"
                @click="handleLogout"
                data-toggle
              >
                {{ menuConfig.logoutTitle }}
              </button>
            </div>
            <router-link
              :to="menuConfig.accountPath.to"
              class="btn btn-dark menu__btn"
              data-toggle
              v-else
              >{{ menuConfig.accountPath.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { useAccountStore } from '@/stores/useAccountStore.js'
import { useMediaQuery } from '@vueuse/core'
import { getImageUrl } from '@/utils/imgUrl.js'
import Collapse from 'bootstrap/js/dist/collapse'

const isMediaLgUp = useMediaQuery('(min-width: 992px)')

const headerInfo = {
  logo: 'assets/logo/logo--sm.svg',
  logoLight: 'assets/logo/logo--light--sm.svg'
}
const menuConfig = {
  indexTitle: '郊友趣・Hiking Friends',
  accountPath: { title: '註冊 / 登入', to: { name: 'Login' } },
  logoutTitle: '登出'
}
const menuData = [
  { title: '首頁', to: { name: 'FrontIndex' } },
  { title: '主題分級', to: { name: 'TrailsIntro' } },
  { title: '探索步道', to: { name: 'TrailsList' } },
  { title: '郊友護照', to: { name: 'PassportIndex' } }
]

const route = useRoute()
const router = useRouter()

const trailsListStore = useTrailsListStore()
const { toggleReload } = storeToRefs(trailsListStore)

const accountStore = useAccountStore()
const { isCheckLoginSuccess, userNickname, isLogoutSuccess } = storeToRefs(accountStore)
const { sendLogoutRequest } = accountStore

function reloadList() {
  const currentRoute = route.fullPath
  if (currentRoute.includes('trails-list')) {
    toggleReload.value = !toggleReload.value
  }
}
async function handleLogout() {
  await sendLogoutRequest()
  if (isLogoutSuccess.value) {
    router.push({ name: 'FrontIndex' })
  }
}

function handleNavLinkClick(path) {
  if (path.name === 'TrailsList') {
    reloadList()
  }
  const menuToggle = document.getElementById('headerNavbar')
  const bsCollapse = Collapse.getInstance(menuToggle) || new Collapse(menuToggle)
  bsCollapse.hide()
}

onMounted(() => {
  const collapseElementList = document.querySelectorAll('.collapse')
  collapseElementList.forEach((collapseEl) => {
    new Collapse(collapseEl, { toggle: false })
  })
})
</script>
