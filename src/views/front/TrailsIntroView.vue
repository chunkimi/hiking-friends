<style lang="scss" scoped></style>

<template>
  <div class="d-grid gap-5">
    <div class="container">
      <h1 class="fs-3 text-end text-primary py-4">步道分級</h1>
    </div>
    <AreaList />
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6"><TypeList /></div>
        <!-- <div class="col-12 col-lg-6"><TourList /></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import AreaList from '@/components/front/intro/AreaList.vue'
import TypeList from '@/components/front/intro/TypeList.vue'
// import TourList from '@/components/front/intro/TourList.vue'
</script>
