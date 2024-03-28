<style lang="scss" scoped>
@import '@/styles/main.scss';
.areaInfoBorder {
  border-bottom: 1px solid $secondary;
  @include media-breakpoint-up(lg) {
    border-bottom: none;
    border-right: 1px solid $secondary;
  }
}
</style>
<template>
  <div class="container d-grid gap-5">
    <h1 class="display-5 text-end text-primary py-4">主題分級</h1>
    <div class="py-15">
      <RoleList />
    </div>
    <div class="row py-15">
      <div class="col-12 col-lg-8 mb-5 mb-lg-0 areaInfoBorder"><AreaList /></div>
      <div class="col-6 col-lg-2"><TypeList /></div>
      <div class="col-6 col-lg-2"><TourList /></div>
    </div>
    <div class="py-15">
      <DifClassTable />
    </div>
  </div>
</template>

<script setup>
import RoleList from '@/components/front/intro/RoleList.vue'
import DifClassTable from '@/components/front/intro/DifClassTable.vue'
import AreaList from '@/components/front/intro/AreaList.vue'
import TypeList from '@/components/front/intro/TypeList.vue'
import TourList from '@/components/front/intro/TourList.vue'
</script>
