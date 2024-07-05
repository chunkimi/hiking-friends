<style lang="scss" scoped></style>
<template>
  <div class="mb-5">
    <label :for="reviewsConfig.type" class="form-label fs-5 mt-3">{{ reviewsConfig.title }}</label>
    <button type="button" class="btn ms-2" @click="openReviewsTextarea">
      <span class="material-icons">{{ reviewsConfig.editBtn }}</span>
    </button>
    <textarea
      v-if="isOpenReviewsTextarea"
      class="form-control"
      rows="4"
      :id="reviewsConfig.type"
      v-model="reviewsModel"
    ></textarea>
    <p v-else class="fs-6 d-flex align-items-center ps-4">
      <span class="material-icons text-secondary me-3"> {{ reviewsConfig.reviewsIcon }} </span>
      <span class="fw-bold text-dark">{{ reviewsValue }}</span>
    </p>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const reviewsConfig = {
  title: '心得評論',
  type: 'reviews',
  editBtn: 'edit_note',
  reviewsIcon: 'sms'
}

const emit = defineEmits(['update:reviewsValue'])
const props = defineProps({
  reviewsValue: {
    type: String,
    required: true
  }
})

const reviewsModel = computed({
  get() {
    return props.reviewsValue
  },
  set(value) {
    emit('update:reviewsValue', value)
  }
})

const isOpenReviewsTextarea = ref(!props.reviewsValue ? true : false)
function openReviewsTextarea() {
  isOpenReviewsTextarea.value = !isOpenReviewsTextarea.value
}
</script>
