<style lang="scss" scoped>
@import '@/styles/main.scss';

.task {
  background-color: $gray-300;
  &--completed {
    background-color: $info;
  }
  &--all-completed {
    background-color: $success;
  }
}

.btn-outline-darken {
  --bs-btn-hover-color: #fff;
  --bs-btn-active-color: #fff;
}
</style>

<template>
  <div class="container">
    <div class="block-spacing">
      <h1 class="h1 text-end">{{ favMgtConfig.pageTitle }}</h1>
      <div>
        <div class="d-flex justify-content-center">
          <div
            class="mx-auto btn-group mb-5"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <template v-for="tabItem in favMgtConfig.tabMenu" :key="tabItem.type">
              <input
                type="radio"
                class="btn-check"
                autocomplete="off"
                :name="tabItem.type"
                :id="tabItem.type"
                :value="tabItem.type"
                v-model="curTabModel"
              />
              <label class="btn btn-outline-darken" :for="tabItem.type">{{ tabItem.title }}</label>
            </template>
          </div>
        </div>
        <p class="text-end fw-light">
          <span>{{ favMgtConfig.typeNumText }}</span>
          <span>{{ favListData.length }}</span>
        </p>
        <div v-if="isHaveCurListData">
          <div class="mb-4" v-for="favItem in curListData" :key="favItem.favId">
            <TaskCard :fav-item="favItem" />
          </div>
        </div>
        <div v-else class="py-20">
          <p class="display-6 text-center text-primary">{{ favMgtConfig.noValueNote }}</p>
        </div>

        <div class="d-flex justify-content-end bg-transparent">
          <PaginationNav
            :current-page="curPage"
            :number-of-pages="numberOfPages"
            @change-page="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import TaskCard from '@/components/dashboard/list/TaskCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'

import { usePaginationUtils } from '@/utils/paginationUtils.js'

const favMgtConfig = {
  pageTitle: '任務管理',
  tabMenu: [
    {
      title: '全部收藏',
      type: 'all'
    },
    {
      title: '尚未攻略',
      type: 'undone'
    },
    {
      title: '完走山徑',
      type: 'done'
    },
    {
      title: '筆記進行',
      type: 'edit'
    },
    {
      title: '任務結束',
      type: 'close'
    }
  ],
  typeNumText: '此分類任務數量：',
  noValueNote: '此分類無步道任務卡片'
}

const favoriteTrailsStore = useFavoriteTrailsStore()
const { favStateListData } = storeToRefs(favoriteTrailsStore)

const curTabModel = ref('all')
const favListData = computed(() => {
  switch (curTabModel.value) {
    case 'all':
      return favStateListData.value
    case 'undone':
      return favStateListData.value.filter((item) => !item.hikingState)
    case 'done':
      return favStateListData.value.filter(
        (item) =>
          (item.hikingState && !item.isHaveRating) || (item.hikingState && !item.isHaveReviews)
      )
    case 'edit':
      return favStateListData.value.filter(
        (item) => item.hikingState && item.isHaveRating && !item.isHaveReviews
      )
    case 'close':
      return favStateListData.value.filter(
        (item) => item.hikingState && item.isHaveRating && item.isHaveReviews
      )
    default:
      return favStateListData.value
  }
})

const { curPage, numberOfPages, curListData, changePage, pageInit } =
  usePaginationUtils(favListData)

const isHaveCurListData = computed(() => (curListData.value.length > 0 ? true : false))

watch(
  curTabModel,
  () => {
    pageInit()
  },
  { immediate: true }
)

onMounted(() => {
  pageInit()
})
</script>
