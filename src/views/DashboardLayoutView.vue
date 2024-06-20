<style lang="scss" scoped>
@import '@/styles/main.scss';

$sidebar-width: 200px;

.dashboard {
  &__sidebar {
    z-index: 10;
    width: $sidebar-width;
    height: 100vh;
    margin-left: -$sidebar-width;
    position: fixed;
    top: 0;
    @include media-breakpoint-up(md) {
      margin-left: 0;
      width: $sidebar-width;
      transition: margin-left 0.25s;
    }
  }
  &__main {
    z-index: 9;
    width: 100%;
    @include media-breakpoint-up(md) {
      width: calc(100vw - #{$sidebar-width});
      margin-left: $sidebar-width;
    }
  }
  &__brand {
    width: 120px;
    height: 36px;
    @include img-replace-text;
  }
  &__link {
    &__text {
      color: $dark;
    }
    &:hover,
    &:focus,
    &:active,
    &.active {
      background: $success;
      .dashboard__link__text {
        color: $light;
      }
    }
  }
}

.sidebar--toggled {
  .dashboard__sidebar {
    margin-left: 0;
  }
  // .dashboard__main {
  //   margin-left: $sidebar-width;
  // }
  @include media-breakpoint-up(md) {
    .dashboard__sidebar {
      margin-left: -$sidebar-width;
    }
    .dashboard__main {
      width: 100%;
      margin-left: 0;
    }
  }
}

.btn-outline-secondary {
  --bs-btn-hover-color: #fff;
  --bs-btn-active-color: #fff;
}
.link-to-front {
  font-weight: bold;
  color: $light;
  @include hover-link;
  &:hover,
  &:focus,
  &:active,
  &.active {
    color: $success;
  }
}
</style>
<template>
  <div id="dashboard">
    <div class="d-flex" :class="isCollapseNav ? 'sidebar--toggled' : ''">
      <header class="pt-0 pb-6 pt-md-6 d-flex flex-column border-end bg-primary dashboard__sidebar">
        <p
          v-if="isMediaMdDown"
          class="d-inline-block lh-1 p-4 m-0 text-light text-end cursor-pointer"
          @click="toggleNav"
          :class="isCollapseNav && isMediaMdDown ? 'text-light' : ''"
        >
          <span class="material-icons"> menu_open </span>
        </p>
        <div class="text-center">
          <h2
            class="brand__img brand__sm m-0"
            :style="{
              background:
                `url(${getImageUrl(navConfig.pageTitle.website.logo)})` +
                `no-repeat center  center/contain`
            }"
          >
            {{ navConfig.pageTitle.website.text }}
          </h2>
          <h2 class="fs-4 my-6 text-light">
            {{ navConfig.pageTitle.main }}
          </h2>
        </div>
        <nav class="h-100 d-flex flex-column justify-content-between">
          <ul class="d-flex flex-column list-unstyled">
            <li
              v-for="navItem in navConfig.menuData"
              :key="navItem.title"
              class="text-center py-4 dashboard__link cursor-pointer"
            >
              <router-link
                :to="navItem.to"
                class="fs-6 w-100 text-decoration-none dashboard__link__text"
                aria-current="page"
                @click="handleNavClick"
              >
                {{ navItem.title }}
              </router-link>
            </li>
          </ul>
          <router-link
            :to="navConfig.frontPath.to"
            class="link-to-front fs-6 fw-bold text-decoration-none text-center"
            >{{ navConfig.frontPath.title }}</router-link
          >
        </nav>
      </header>
      <main class="dashboard__main">
        <div class="border-bottom sticky-top d-flex justify-content-between">
          <p
            class="d-inline-block lh-1 p-4 m-0 text-secondary cursor-pointer border-end"
            @click="toggleNav"
          >
            <span class="material-icons"> menu_open </span>
          </p>
          <div class="d-flex justify-content-center align-items-center pe-8">
            <p class="fw-bold p-0 m-0 mx-3 d-flex justify-content-center">
              <span class="material-icons"> face </span>
              <span class="ms-1"> {{ userNickname }}</span>
            </p>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="handleLogout"
              v-if="isMediaMdDown"
            >
              {{ navConfig.logoutTitle }}
            </button>
          </div>
        </div>
        <div class="container">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { getImageUrl } from '@/utils/imgUrl'
import { useMediaQuery } from '@vueuse/core'

const navConfig = {
  pageTitle: {
    website: { text: '郊友趣', logo: 'assets/logo/logo--light--sm.svg' },
    main: '郊友護照'
  },
  menuData: [
    { title: '總覽', to: { name: 'PassportIndex' } },
    { title: '足跡分析', to: { name: 'PerAnalysis' } },
    { title: '步道任務', to: { name: 'FavTrailsList' } }
  ],
  frontPath: { title: '回到主頁', to: { name: 'FrontIndex' } },
  logoutTitle: '登出'
}

const isMediaMdDown = useMediaQuery('(max-width: 768px)')
const router = useRouter()
const accountStore = useAccountStore()
const { isCheckLoginSuccess, userNickname, isLogoutSuccess } = storeToRefs(accountStore)
const { checkLoginStatus, sendLogoutRequest } = accountStore
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)
const { sendFavListRequest } = favoriteTrailsStore
const isCollapseNav = ref(false)

function toggleNav() {
  console.log('toggleNav')
  isCollapseNav.value = !isCollapseNav.value
}

function handleNavClick() {
  if (isMediaMdDown.value) {
    toggleNav()
  }
}

async function handleLogout() {
  await sendLogoutRequest()
  if (isLogoutSuccess.value) {
    router.push({ name: 'FrontIndex' })
  }
}

onBeforeMount(async () => {
  try {
    await checkLoginStatus()
    if (!isCheckLoginSuccess.value) {
      router.push({ name: 'Login' })
    } else {
      dashboardDataInit()
    }
  } catch (error) {
    console.error('Error during login check:', error)
  }
})

async function dashboardDataInit() {
  try {
    await sendFavListRequest()
    console.log('dashboard-favTrailsList', favTrailsListData)
  } catch (error) {
    console.error('Error dashboard request favTrailsList:', error)
  }
}
</script>
