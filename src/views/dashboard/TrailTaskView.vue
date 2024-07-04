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

.btn-outline-primary {
  --bs-btn-hover-color: #fff;
}
</style>
<template>
  <div class="container py-20">
    <GoBackIcon />
    <div class="block-spacing">
      <div class="text-end">
        <h1 class="fs-6">{{ taskConfig.pageTitle }}</h1>
        <h2 class="display-4">{{ curTrailTask.TR_CNAME }}</h2>
      </div>
      <div>
        <h3 class="h4 ps-2 mb-5 border-start border-4 border-warning">
          {{ taskConfig.sectionTitle.trailInfo }}
        </h3>
        <ul class="list-unstyled px-3 row">
          <li
            v-for="infoItem in taskConfig.trailInfo"
            :key="infoItem.type"
            class="col-6 col-md-3 col-lg-2 d-flex flex-column mb-4 mb-lg-0"
          >
            <span class="mb-1 fw-light">{{ infoItem.title }}</span>
            <span v-if="infoItem.type === 'TR_ADMIN'" class="fs-5 fw-bold">{{
              getRegionByAdmin(curTrailTask.info[infoItem.type])
            }}</span>
            <span v-else class="fs-5 fw-bold">{{ curTrailTask.info[infoItem.type] }}</span>
          </li>
          <li class="col-12 col-lg-3 d-flex align-items-center">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary w-100 w-lg-50"
              @click="readMoreTrailInfo"
            >
              {{ taskConfig.moreTrailInfoBtn.text }}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="h4 ps-2 mb-5 border-start border-4 border-warning">
          {{ taskConfig.sectionTitle.progress }}
        </h3>
        <div class="px-3 mb-20">
          <p class="mb-5 fw-lighter d-flex align-items-center">
            <span class="material-icons"> volume_down </span>
            <span class="my-1">{{ progressDescription }}</span>
          </p>
          <DotCheckProgressBar :progress-node="progressNode" :fav-item="curTrailTask" />
        </div>
      </div>
      <div class="">
        <h3 class="h4 ps-2 mb-5 border-start border-4 border-warning">
          {{ taskConfig.sectionTitle.note }}
        </h3>
        <div class="px-3">
          <TaskNote :cur-task-id="curTaskId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
import { defaultFavItem, getRegionByAdmin } from '@/utils/favTrailStateUtils.js'
import { progressNode, getProgressDescription } from '@/utils/favTrailStateUtils.js'

import GoBackIcon from '@/components/front/base/GoBackIcon.vue'
import DotCheckProgressBar from '@/components/common/DotCheckProgressBar.vue'
import TaskNote from '@/components/dashboard/TaskNote.vue'

const taskConfig = {
  pageTitle: '步道任務管理',
  sectionTitle: {
    trailInfo: '步道基本資訊',
    progress: '執行進度',
    note: '探險筆記'
  },
  trailInfo: [
    {
      title: '區域',
      type: 'TR_ADMIN'
    },
    {
      title: '步道長度（km）',
      type: 'TR_LENGTH_NUM'
    },
    {
      title: '海拔（m）',
      type: 'TR_ALT'
    },

    {
      title: '難易度分級',
      type: 'TR_DIF_CLASS'
    }
  ],
  moreTrailInfoBtn: {
    text: '瀏覽更多資訊',
    path: 'TrailInfo'
  }
}

const favoriteTrailsStore = useFavoriteTrailsStore()
const { favStateListData } = storeToRefs(favoriteTrailsStore)

const route = useRoute()
const curTaskId = route.params.task
const curTrailTask = computed(() => {
  return favStateListData.value.find((item) => item.favId == curTaskId) || defaultFavItem
})

const router = useRouter()
function readMoreTrailInfo() {
  router.push({ name: 'TrailInfo', params: { trail: curTrailTask.value.TRAILID } })
}

const progressDescription = computed(() => {
  return getProgressDescription(curTrailTask.value)
})
</script>
