<style lang="scss" scoped>
.mes__wrap {
  height: 50vh;
}
.btn-outline-success {
  --bs-btn-hover-color: #fff;
  --bs-btn-active-color: #fff;
}
</style>
<template>
  <div class="container py-20">
    <div class="mes__wrap d-flex flex-column justify-content-center align-items-center">
      <p class="display-6 mb-10">
        <span v-if="isEmptyAnal"> {{ emptyMesConfig.analMsg }}</span>
        <span v-else> {{ emptyMesConfig.commonMsg }}</span>
      </p>
      <RouterLink
        v-if="isEmptyAnal"
        class="btn w-50 btn-outline-success"
        :to="emptyMesConfig.taskListBtn.to"
        >{{ emptyMesConfig.taskListBtn.title }}</RouterLink
      >
      <RouterLink v-else class="btn w-50 btn-outline-success" :to="emptyMesConfig.frontBtn.to">{{
        emptyMesConfig.frontBtn.title
      }}</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'

const emptyMesConfig = {
  commonMsg: '還沒有收藏步道唷ε(*´･∀･｀)зﾞ',
  analMsg: '還沒有步道執行進度可以分析( ˘•ω•˘ )',
  frontBtn: { title: '探索步道', to: { name: 'FrontIndex' } },
  taskListBtn: { title: '管理步道任務', to: { name: 'TaskListMgt' } }
}

defineProps({
  isEmptyAnal: {
    type: Boolean
  }
})
</script>
