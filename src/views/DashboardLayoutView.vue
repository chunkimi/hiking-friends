<style lang="scss" scoped>
@import '@/styles/main.scss';

$sidebar-width-sm: 120px;
$sidebar-width: 200px;

.dashboard {
  &____wrap {
    z-index: 9999;
  }
  &__sidebar {
    z-index: 2;
    width: $sidebar-width-sm;
    height: 100vh;
    margin-left: -$sidebar-width-sm;
    position: fixed;
    top: 0;
    @include media-breakpoint-up(md) {
      margin-left: 0;
      width: $sidebar-width;
      transition: margin-left 0.25s;
    }
  }
  &__main {
    z-index: 1;
    width: 100%;
    @include media-breakpoint-up(md) {
      width: calc(100vw - #{$sidebar-width});
      margin-left: $sidebar-width;
    }
  }
  &__brand {
    width: 60px;
    height: 18px;
    @include img-replace-text;
    @include media-breakpoint-up(md) {
      width: 120px;
      height: 36px;
    }
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
          <span class="material-icons">{{ navConfig.menuIcon }}</span>
        </p>
        <div class="text-center px-1">
          <h2
            class="d-inline-block brand__img brand--sm p-0 m-0"
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
                class="fs-6 py-4 px-7 px-md-10 px-lg-14 text-decoration-none dashboard__link__text"
                aria-current="page"
                @click="handleNavClick(navItem.to)"
              >
                <span class="material-icons me-1" v-if="isMediaMdDown">{{ navItem.icon }}</span>
                <span v-else>{{ navItem.title }}</span>
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
            <span class="material-icons">{{ navConfig.menuIcon }}</span>
          </p>
          <div class="d-flex justify-content-center align-items-center pe-8">
            <p class="fw-bold p-0 m-0 mx-3 d-flex justify-content-center">
              <span class="material-icons"> face </span>
              <span class="ms-1"> {{ userNickname }}</span>
            </p>
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="handleLogout">
              {{ navConfig.logoutTitle }}
            </button>
          </div>
        </div>
        <div class="container px-3 px-lg-6">
          <div v-if="isOpenLoading">
            <LoadingSpinner />
          </div>
          <div v-else><RouterView /></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { useTaskListMgtStore } from '@/stores/useTaskListMgtStore'
import { getImageUrl } from '@/utils/imgUrl'
import { useMediaQuery } from '@vueuse/core'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const navConfig = {
  pageTitle: {
    website: { text: '郊友趣', logo: 'assets/logo/logo--light--sm.svg' },
    main: '郊友護照'
  },
  menuData: [
    { title: '總覽', icon: 'dashboard', to: { name: 'PassportIndex' } },
    { title: '足跡分析', icon: 'insights', to: { name: 'PerAnalysis' } },
    { title: '步道任務', icon: 'assignment', to: { name: 'TaskListMgt' } }
  ],
  frontPath: { title: '回到主頁', to: { name: 'FrontIndex' } },
  logoutTitle: '登出',
  menuIcon: 'menu_open'
}

const isOpenLoading = ref(true)
const isMediaMdDown = useMediaQuery('(max-width: 768px)')
const router = useRouter()

const accountStore = useAccountStore()
const { isCheckLoginSuccess, userNickname, isLogoutSuccess } = storeToRefs(accountStore)
const { checkLoginStatus, sendLogoutRequest } = accountStore

const favoriteTrailsStore = useFavoriteTrailsStore()
const { taskListData, favTrailsData, isFavRequestSuccess } = storeToRefs(favoriteTrailsStore)
const { sendFavListRequest } = favoriteTrailsStore

async function handleLogout() {
  await sendLogoutRequest()
  if (isLogoutSuccess.value) {
    favTrailsData.value = []
    taskListData.value = []
    router.push({ name: 'FrontIndex' })
  }
}

async function dashboardDataInit() {
  isOpenLoading.value = true
  await sendFavListRequest()
  if (isFavRequestSuccess.value) {
    isOpenLoading.value = false
  }
}

onMounted(async () => {
  await checkLoginStatus()
  if (!isCheckLoginSuccess.value) {
    router.push({ name: 'Login' })
  } else {
    dashboardDataInit()
  }
})

const isCollapseNav = ref(false)

function toggleNav() {
  isCollapseNav.value = !isCollapseNav.value
}

function handleNavClick(path) {
  if (path.name === 'TaskListMgt') {
    reloadMgtList()
  }
  if (isMediaMdDown.value) {
    toggleNav()
  }
}

const route = useRoute()
const taskListMgtStore = useTaskListMgtStore()
const { toggleReloadMgt } = storeToRefs(taskListMgtStore)

function reloadMgtList() {
  const currentRoute = route.fullPath
  if (currentRoute.includes('task-list')) {
    toggleReloadMgt.value = !toggleReloadMgt.value
  }
}
</script>
