<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end mt-10">{{ passportConfig.pageTitle }}</h1>
    <div v-if="isEmptyTaskData">
      <EmptyListMes />
    </div>
    <div v-else class="block-spacing">
      <ProgressCard :task-list-data="taskListData" />
      <ProgressStateChart
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-task-num="doneTaskNum"
      />
      <TaskListOverview :task-list-data="taskListData" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import ProgressCard from '@/components/dashboard/anal/ProgressCard.vue'
import ProgressStateChart from '@/components/dashboard/anal/ProgressStateChart.vue'
import TaskListOverview from '@/components/dashboard/task/TaskListOverview.vue'
import EmptyListMes from '@/components/dashboard/EmptyListMes.vue'

const favoriteTrailsStore = useFavoriteTrailsStore()
const { taskListData, allTrailsNum, favTrailsNum, doneTaskNum, isEmptyTaskData } =
  storeToRefs(favoriteTrailsStore)

const passportConfig = {
  pageTitle: '總覽'
}
</script>
