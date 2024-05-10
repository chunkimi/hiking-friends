<template>
  <div class="container d-grid gap-5">
    <h1 class="display-5 text-end text-primary py-4">主題分級</h1>
    <div class="py-15">
      <RoleList />
    </div>
    <div class="py-15">
      <ExploreList />
    </div>
    <div class="py-15">
      <DifClassTable />
    </div>
  </div>
</template>

<script setup>
import RoleList from '@/components/front/intro/RoleList.vue'
import ExploreList from '@/components/front/intro/ExploreList.vue'
import DifClassTable from '@/components/front/intro/DifClassTable.vue'
</script>
