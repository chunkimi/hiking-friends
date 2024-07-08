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
    <h1 class="h1 text-end mt-10">{{ taskMgtConfig.pageTitle }}</h1>
    <div v-if="isEmptyTaskData">
      <EmptyListMes />
    </div>
    <div v-else>
      <div class="d-flex justify-content-center mt-20 mb-5">
        <div
          class="mx-auto btn-group mb-5"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <template v-for="tabItem in taskMgtConfig.tabMenu" :key="tabItem.type">
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
      <div v-if="isHaveCurListData">
        <p class="text-end fw-light mb-5">
          <span>{{ taskMgtConfig.typeNumText }}</span>
          <span>{{ taskMgtListData.length }}</span>
        </p>
        <div class="mb-4" v-for="taskItem in curListData" :key="taskItem.favId">
          <TaskCard :task-item="taskItem" />
        </div>
        <div class="d-flex justify-content-end bg-transparent">
          <PaginationNav
            :current-page="curPage"
            :number-of-pages="numberOfPages"
            @change-page="changePage"
          />
        </div>
      </div>
      <div v-else class="py-20">
        <p class="display-6 text-center text-primary">{{ taskMgtConfig.noValueNote }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { usePaginationUtils } from '@/utils/paginationUtils.js'
import TaskCard from '@/components/dashboard/task/TaskCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'
import EmptyListMes from '@/components/dashboard/EmptyListMes.vue'

const taskMgtConfig = {
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
const { taskListData, isEmptyTaskData } = storeToRefs(favoriteTrailsStore)

const curTabModel = ref('all')
const taskMgtListData = computed(() => {
  switch (curTabModel.value) {
    case 'all':
      return taskListData.value
    case 'undone':
      return taskListData.value.filter((item) => !item.hikingState)
    case 'done':
      return taskListData.value.filter(
        (item) =>
          (item.hikingState && !item.isHaveRating) || (item.hikingState && !item.isHaveReviews)
      )
    case 'edit':
      return taskListData.value.filter(
        (item) => item.hikingState && item.isHaveRating && !item.isHaveReviews
      )
    case 'close':
      return taskListData.value.filter(
        (item) => item.hikingState && item.isHaveRating && item.isHaveReviews
      )
    default:
      return taskListData.value
  }
})

const { curPage, numberOfPages, curListData, changePage, pageInit } =
  usePaginationUtils(taskMgtListData)

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
