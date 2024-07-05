<style lang="scss" scoped></style>

<template>
  <div class="container">
    <h1 class="h1 text-end mt-10">{{ perAnalConfig.pageTitle }}</h1>
    <div v-if="isEmptyTaskData">
      <EmptyListMes :is-empty-anal="isEmptyDoneTask" />
    </div>
    <div v-else class="block-spacing">
      <RidgeLine :task-list-data="taskListData" />
      <ProgressAnalSection
        :task-list-data="taskListData"
        :all-trails-num="allTrailsNum"
        :fav-trails-num="favTrailsNum"
        :done-task-num="doneTaskNum"
      />
      <DoneAnalSection :task-list-data="taskListData" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import RidgeLine from '@/components/dashboard/anal/RidgeLine.vue'
import ProgressAnalSection from '@/components/dashboard/anal/ProgressAnalSection.vue'
import DoneAnalSection from '@/components/dashboard/anal/DoneAnalSection.vue'
import EmptyListMes from '@/components/dashboard/EmptyListMes.vue'

const perAnalConfig = {
  pageTitle: '足跡分析'
}

const favoriteTrailsStore = useFavoriteTrailsStore()
const { taskListData, allTrailsNum, favTrailsNum, doneTaskNum, isEmptyTaskData } =
  storeToRefs(favoriteTrailsStore)

const isEmptyDoneTask = computed(() => (doneTaskNum.value === 0 ? true : false))
</script>
