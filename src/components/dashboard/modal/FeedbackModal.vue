<style lang="scss" scoped>
@import '@/styles/main.scss';
.feedback {
  &__rating {
    border: none;
    span {
      color: $secondary;
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
  <div
    ref="modal"
    class="modal fade"
    id="feedbackModal"
    tabindex="-1"
    aria-labelledby="feedbackModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="feedbackModalLabel">{{ feedbackConfig.title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-8">
            <h4 class="h4 mb-5">{{ curFavItem.TR_CNAME }}</h4>
            <div class="d-flex justify-content-start mb-5">
              <div class="form-check form-check-reverse form-switch">
                <label class="form-check-label" :for="feedbackConfig.form.hikingState.type">{{
                  feedbackConfig.form.hikingState.title
                }}</label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="feedbackConfig.form.hikingState.type"
                  v-model="isHikingCompleted"
                />
              </div>
            </div>

            <!-- Rating -->
            <div class="mb-5">
              <label class="form-label">{{ feedbackConfig.form.ratings.title }}</label>
              <div class="">
                <template v-for="item in feedbackConfig.ratingStarNum" :key="item">
                  <input
                    type="checkbox"
                    class="btn-check"
                    :id="`rating-${item}`"
                    v-model="ratings[item - 1]"
                    @change="updateRatings(item)"
                  />
                  <label
                    :for="`rating-${item}`"
                    class="btn feedback__rating"
                    :class="{ active: ratings[item - 1] }"
                  >
                    <span class="material-icons">{{ feedbackConfig.ratingIcon }}</span>
                  </label>
                </template>
              </div>
            </div>

            <!-- Review -->
            <div class="mb-5">
              <label :for="feedbackConfig.form.reviews.type" class="form-label">{{
                feedbackConfig.form.reviews.title
              }}</label>
              <textarea
                class="form-control"
                rows="4"
                :id="feedbackConfig.form.reviews.type"
                v-model="curFavData.content.reviews"
              ></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="handleDelFav">
              {{ feedbackConfig.delBtn }}
            </button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {{ feedbackConfig.closeBtn }}
            </button>
            <button type="button" class="btn btn-outline-primary">
              {{ feedbackConfig.saveBtn }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const feedbackConfig = {
  title: '步道任務編輯',
  closeBtn: '關閉',
  saveBtn: '儲存',
  delBtn: '刪除此筆步道任務',
  ratingStarNum: 5,
  ratingIcon: 'star',
  form: {
    hikingState: {
      title: '完走狀態',
      type: 'hikingState'
    },
    ratings: {
      title: '評分',
      type: 'rating'
    },
    reviews: {
      title: '心得評論',
      type: 'reviews'
    }
  }
}

const curFavItem = ref({
  TRAILID: '001',
  TR_CNAME: '蘇花古道：大南澳越嶺段',
  TR_LENGTH_NUM: 4.1,
  favId: 'fav20240621001',
  hikingState: true,
  isHaveRating: true,
  isHaveReviews: false
})

const curFavData = ref({
  id: 'fav20240621002',
  content: {
    TRAILID: '002',
    rating: 4,
    reviews: '非常棒的步道'
  },
  completed_at: '2024-06-21T10:30:00Z'
})

const isHikingCompleted = computed({
  get() {
    return curFavData.value.completed_at !== null && curFavData.value.completed_at !== ''
  },
  set(value) {
    curFavData.value.completed_at = value ? new Date().toISOString() : null
  }
})
const ratings = ref(new Array(feedbackConfig.ratingStarNum).fill(false))
watch(
  () => curFavData.value.content.rating,
  (newRating) => {
    for (let i = 0; i < ratings.value.length; i++) {
      ratings.value[i] = i < newRating
    }
  },
  { immediate: true }
)

function updateRatings(index) {
  if (ratings.value[index - 1]) {
    for (let i = 0; i < index; i++) {
      ratings.value[i] = true
    }
    curFavData.value.content.rating = index
  } else {
    for (let i = index; i < ratings.value.length; i++) {
      ratings.value[i] = false
    }
    curFavData.value.content.rating = index - 1
  }
}

function handleDelFav() {
  console.log('handleDelFav')
}
</script>
