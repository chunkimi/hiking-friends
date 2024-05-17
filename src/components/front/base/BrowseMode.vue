<template>
  <template v-for="modeItem in modeData" :key="modeItem.type">
    <input
      type="radio"
      class="btn-check"
      autocomplete="off"
      :name="modeItem.type"
      :id="modeItem.type"
      :value="modeItem.type"
      v-model="modeModal"
    />
    <label
      :for="modeItem.type"
      class="text-secondary"
      :class="{ 'text-success': modeItem.type === modeModal }"
    >
      <span class="material-icons fs-4 fw-bold ms-3 cursor-pointer">{{
        modeItem.icon
      }}</span></label
    >
  </template>
</template>
<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:selectedMode'])
const props = defineProps({
  selectedMode: {
    type: String,
    required: true
  }
})

const modeData = [
  {
    type: 'card',
    icon: 'dashboard'
  },
  {
    type: 'columnar',
    icon: 'format_list_bulleted'
  }
]
const modeModal = computed({
  get() {
    return props.selectedMode
  },
  set(value) {
    emit('update:selectedMode', value)
  }
})
</script>
