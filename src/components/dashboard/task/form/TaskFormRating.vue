<style lang="scss" scoped>
@import '@/styles/main.scss';
.feedback {
  &__rating {
    border: none;
    span {
      color: #d3d3d3;
    }
    &.active {
      span {
        color: $warning;
      }
    }
  }
}
</style>
<template>
  <div class="mb-5 d-flex align-items-center">
    <label class="form-label fs-5 me-3">{{ ratingConfig.title }}</label>
    <div>
      <template v-for="(item, index) in ratingBaseNum" :key="item">
        <input
          type="checkbox"
          class="btn-check"
          :id="`rating-${item}`"
          v-model="ratingModel[item - 1]"
          @change="updateRating(item)"
          :disabled="isDisabled(index)"
        />
        <label
          :for="`rating-${item}`"
          class="btn feedback__rating"
          :class="{ active: ratingModel[item - 1] }"
        >
          <span class="material-icons">{{ ratingConfig.starIcon }}</span>
        </label>
      </template>
    </div>
  </div>
</template>
<script setup>
import { watch, computed } from 'vue'

const ratingConfig = {
  title: '評分',
  type: 'rating',
  starIcon: 'star'
}

const emit = defineEmits(['update:rawRatingValue'])
const props = defineProps({
  ratingInitialValue: {
    type: Number,
    required: true
  },
  rawRatingValue: {
    type: Array,
    required: true
  },
  ratingBaseNum: {
    type: Number,
    required: true
  }
})

const ratingModel = computed({
  get() {
    return props.rawRatingValue
  },
  set(value) {
    emit('update:rawRatingValue', value)
  }
})

watch(
  () => props.ratingInitialValue,
  (newRating) => {
    if (newRating === undefined) {
      ratingModel.value.fill(false)
    } else {
      ratingModel.value.fill(false)
      for (let i = 0; i < newRating; i++) {
        ratingModel.value[i] = true
      }
    }
  },
  { immediate: true }
)

function isDisabled(index) {
  if (index === 0) {
    return false
  }
  return !ratingModel.value[index - 1]
}

function updateRating(index) {
  if (ratingModel.value[index]) {
    for (let i = 0; i <= index; i++) {
      ratingModel.value[i] = true
    }
  } else {
    for (let i = index + 1; i < ratingModel.value.length; i++) {
      ratingModel.value[i] = false
    }
  }
}
</script>
