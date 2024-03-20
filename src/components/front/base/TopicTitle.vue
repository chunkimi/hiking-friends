<style lang="scss" scoped>
.icon-radiation {
  display: flex;
  justify-content: center;
  &__timeline {
    width: 120px;
    height: 120px;
    background-image: url('@/assets/icons/timeline.svg');
    align-items: center;
  }
  &__sunshine {
    width: 120px;
    height: 60px;
    background-image: url('@/assets/icons/sunshine.svg');
    align-items: end;
  }
}
</style>
<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="icon-radiation mb-1" :class="`icon-radiation__${circleType}`">
      <span class="material-icons-outlined text-secondary fs-1">{{ icon }}</span>
    </div>
    <h3 class="fs-6 fw-bold">{{ title }}</h3>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  circleType: {
    type: String,
    required: true
  }
})
</script>
