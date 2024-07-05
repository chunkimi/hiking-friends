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
.btn-secondary {
  --bs-btn-color: #fff;
}

.btn-outline-danger {
  --bs-btn-hover-color: #fff;
}
</style>
<template>
  <!-- state -->
  <div class="d-flex justify-content-start mb-5">
    <div class="form-check form-check-reverse form-switch">
      <label class="form-check-label fs-5 me-3" :for="noteConfig.sectionTitle.hikingState.type">{{
        noteConfig.sectionTitle.hikingState.title
      }}</label>
      <input
        class="form-check-input"
        type="checkbox"
        :id="noteConfig.sectionTitle.hikingState.type"
        v-model="stateModel"
      />
    </div>
  </div>
  <div v-if="stateModel">
    <!-- Rating -->
    <div class="mb-5 d-flex align-items-center">
      <label class="form-label fs-5 me-3">{{ noteConfig.sectionTitle.ratings.title }}</label>
      <div>
        <template v-for="item in noteConfig.ratingSetting.starNum" :key="item">
          <input
            type="checkbox"
            class="btn-check"
            :id="`rating-${item}`"
            v-model="ratingModel[item - 1]"
            @change="updateRatings(item)"
          />
          <label
            :for="`rating-${item}`"
            class="btn feedback__rating"
            :class="{ active: ratingModel[item - 1] }"
          >
            <span class="material-icons">{{ noteConfig.ratingSetting.icon }}</span>
          </label>
        </template>
      </div>
    </div>
    <!-- Review -->
    <div class="mb-5">
      <label :for="noteConfig.sectionTitle.reviews.type" class="form-label fs-5 mt-3">{{
        noteConfig.sectionTitle.reviews.title
      }}</label>
      <button type="button" class="btn ms-2" @click="openReviewsTextarea">
        <span class="material-icons">{{ noteConfig.editBtn }}</span>
      </button>
      <textarea
        v-if="isOpenReviewsTextarea"
        class="form-control"
        rows="4"
        :id="noteConfig.sectionTitle.reviews.type"
        v-model="reviewsModel"
      ></textarea>
      <p v-else class="fs-6 d-flex align-items-center ps-4">
        <span class="material-icons text-secondary me-3"> sms </span>
        <span class="fw-bold text-dark">{{ curFavData.content?.reviews }}</span>
      </p>
    </div>
  </div>
  <div v-else>
    <p class="fs-6 fw-light">{{ noteConfig.undoneMes }}</p>
  </div>
  <!-- btn -->
  <div class="row justify-content-center mt-20">
    <div class="col-12 col-md-8 col-lg-4">
      <div class="d-flex flex-column">
        <button type="button" class="btn btn-sm btn-secondary w-100 mb-5" @click="handleSaveUpdate">
          {{ noteConfig.saveBtn }}
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="handleDelFav">
          {{ noteConfig.delBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { defaultFavData } from '@/utils/favTrailStateUtils.js'

const noteConfig = {
  sectionTitle: {
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
  },
  ratingSetting: {
    starNum: 5,
    icon: 'star'
  },
  undoneMes: '完成步道，就可以開啟心得筆記欄(๑•̀ㅂ•́)و✧',
  reviewsIcon: 'sms',
  editBtn: 'edit_note',
  saveBtn: '儲存變更',
  delBtn: '刪除本項步道收藏，解除任務'
}

const props = defineProps({
  curTaskId: {
    type: String,
    required: true
  }
})

const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsData } = storeToRefs(favoriteTrailsStore)

const curFavData = computed(() => {
  if (!props.curTaskId) return defaultFavData
  return favTrailsData.value.find((item) => item.id === props.curTaskId) || defaultFavData
})

const stateModel = ref(curFavData.value.completed_at ? true : false)

const reviewsModel = ref(curFavData.value.content?.reviews || '')
const ratingModel = ref(new Array(noteConfig.ratingSetting.starNum).fill(false))

const ratingValue = computed(() => {
  let result = ratingModel.value.filter((item) => item === true)

  return result.length
})

watch(
  () => curFavData.value.content?.rating,
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

function updateRatings(index) {
  if (ratingModel[index - 1]) {
    for (let i = 0; i < index; i++) {
      ratingModel.value[i] = true
    }
    curFavData.value.content.rating = index
  } else {
    for (let i = index; i < ratingModel.value.length; i++) {
      ratingModel.value[i] = false
    }
    curFavData.value.content.rating = index - 1
  }
}

const isOpenReviewsTextarea = ref(!curFavData.value.content?.reviews ? true : false)

function openReviewsTextarea() {
  isOpenReviewsTextarea.value = !isOpenReviewsTextarea.value
}

function handleSaveUpdate() {
  console.log('ratingValue', ratingValue.value)
}

function handleDelFav() {
  console.log('handleDelFav')
}
</script>
