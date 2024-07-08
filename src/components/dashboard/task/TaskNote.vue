<style lang="scss" scoped>
@import '@/styles/main.scss';
.btn-secondary {
  --bs-btn-color: #fff;
}

.btn-outline-danger {
  --bs-btn-hover-color: #fff;
}
</style>
<template>
  <TaskFormHikingState v-model:state-value="stateValue" />
  <div v-if="stateValue">
    <TaskFormRating
      :rating-initial-value="ratingInitialValue"
      :rating-base-num="noteConfig.ratingBaseNum"
      v-model:raw-rating-value="rawRatingValue"
    />
    <TaskFormReviews v-model:reviews-value="reviewsValue" />
  </div>
  <div v-else>
    <p class="fs-6 fw-light">{{ noteConfig.undoneMes }}</p>
  </div>
  <div class="row justify-content-center mt-20">
    <div class="col-12 col-md-8 col-lg-4">
      <div class="d-flex flex-column">
        <button type="button" class="btn btn-sm btn-secondary w-100 mb-5" @click="handleSaveUpdate">
          {{ noteConfig.saveBtn }}
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="handleDelTask">
          {{ noteConfig.delBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { defaultFavData } from '@/utils/favTrailStateUtils.js'
import TaskFormHikingState from '@/components/dashboard/task/TaskFormHikingState.vue'
import TaskFormRating from '@/components/dashboard/task/TaskFormRating.vue'
import TaskFormReviews from '@/components/dashboard/task/TaskFormReviews.vue'

const noteConfig = {
  undoneMes: '完成步道，就可以開啟心得筆記欄(๑•̀ㅂ•́)و✧',
  ratingBaseNum: 5,
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
const { handleDel } = favoriteTrailsStore

const curFavData = computed(() => {
  if (!props.curTaskId) return defaultFavData
  return favTrailsData.value.find((item) => item.id === props.curTaskId) || defaultFavData
})

const stateValue = ref(curFavData.value.completed_at ? true : false)
const reviewsValue = ref(curFavData.value.content?.reviews || '')

const rawRatingValue = ref(new Array(noteConfig.ratingBaseNum).fill(false))
const ratingInitialValue = ref(parseInt(curFavData.value.content?.rating) || 0)

const ratingValue = computed(() => {
  let result = rawRatingValue.value.filter((item) => item === true)
  return result.length
})

function handleSaveUpdate() {
  console.log('ratingValue', ratingValue.value, stateValue.value, reviewsValue.value)
}

const router = useRouter()

async function handleDelTask() {
  const result = await handleDel(props.curTaskId)
  if (result) {
    router.push({ name: 'TaskListMgt' })
  }
}
</script>
