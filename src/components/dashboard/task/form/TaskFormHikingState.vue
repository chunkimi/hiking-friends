<style lang="scss" scoped></style>
<template>
  <div class="d-flex justify-content-start mb-5">
    <div class="form-check form-check-reverse form-switch">
      <label class="form-check-label fs-5 me-3" :for="stateConfig.type">{{
        stateConfig.title
      }}</label>
      <input class="form-check-input" type="checkbox" :id="stateConfig.type" v-model="stateModel" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const stateConfig = {
  title: '完走狀態',
  type: 'hikingState'
}
const emit = defineEmits(['update:stateValue'])
const props = defineProps({
  stateValue: {
    type: Boolean,
    required: true
  }
})

const stateModel = computed({
  get() {
    return props.stateValue
  },
  set(value) {
    emit('update:stateValue', value)
  }
})
</script>
