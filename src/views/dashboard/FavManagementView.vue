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
        <div class="mb-4" v-for="favItem in curListData" :key="favItem.favId">
          <TaskCard :fav-item="favItem" />
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
  <!-- modal -->
  <FeedbackModal />
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import TaskCard from '@/components/dashboard/TaskCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'
import FeedbackModal from '@/components/dashboard/modal/FeedbackModal.vue'
import { usePaginationUtils } from '@/utils/paginationUtils.js'

const favMgtConfig = {
  pageTitle: '步道任務',
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
      title: '任務結束',
      type: 'close'
    }
  ]
}

const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)

const curTabModel = ref('all')
const favListData = computed(() => {
  switch (curTabModel.value) {
    case 'all':
      return favTrailsListData.value
    case 'undone':
      return favTrailsListData.value.filter((item) => !item.hikingState)
    case 'done':
      return favTrailsListData.value.filter(
        (item) =>
          (item.hikingState && !item.isHaveRating) || (item.hikingState && !item.isHaveReviews)
      )
    case 'close':
      return favTrailsListData.value.filter(
        (item) => item.hikingState && item.isHaveRating && item.isHaveReviews
      )
    default:
      return favTrailsListData.value
  }
})

const { curPage, numberOfPages, curListData, changePage, pageInit } =
  usePaginationUtils(favListData)

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
