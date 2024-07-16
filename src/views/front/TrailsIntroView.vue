<template>
  <div class="container">
    <div class="block-spacing">
      <h1 class="h1 text-end mt-10 text-primary">{{ introConfig.pageTitle }}</h1>
      <RoleList />
      <ExploreList />
      <DifClassTable />
    </div>
  </div>
</template>

<script setup>
import RoleList from '@/components/front/intro/RoleList.vue'
import ExploreList from '@/components/front/intro/ExploreList.vue'
import DifClassTable from '@/components/front/intro/DifClassTable.vue'

const introConfig = {
  pageTitle: '主題分級'
}
</script>
