<style lang="scss" scoped>
@import '@/styles/main.scss';

.tertiaryInfo-collapse-enter-active,
.tertiaryInfo-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.tertiaryInfo-collapse-enter-from,
.tertiaryInfo-collapse-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="container d-grid gap-5">
    <div class="py-15 mb-15 mb-lg-0">
      <div class="mb-4">
        <GoBackIcon />
      </div>
      <PurposeTitle :trail-info="curTrailData" />
    </div>
    <div class="row flex-lg-row-reverse py-15">
      <div class="col-12 col-lg-8 offset-lg-1 mb-15 mb-lg-0">
        <div class="h-100 d-flex align-items-center py-8 px-4 py-lg-0">
          <p class="fs-4 fst-italic fw-lighter lh-lg">{{ curTrailData.GUIDE_CONTENT }}</p>
        </div>
      </div>
      <div class="col-6 mx-auto mx-lg-0 col-lg-3">
        <RoadCondition
          :all-trails-news="trailsNewsData"
          :trail-id="curTrailId"
          :title="sectionTitle.roadCondition"
        />
      </div>
    </div>
    <div class="py-15">
      <BaseInfo :title="sectionTitle.secondaryInfo" :trail-info="curTrailData" />
      <div class="d-flex justify-content-center pt-15">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary d-flex align-items-center"
          @click="toggleTertiaryCollapse"
        >
          <span class="material-icons" v-if="isOpenTertiaryInfo">expand_less</span>
          <span class="material-icons" v-else> expand_more </span>
        </button>
      </div>
    </div>
    <transition name="tertiaryInfo-collapse">
      <div class="py-15" v-if="isOpenTertiaryInfo">
        <BaseInfo :title="sectionTitle.tertiaryInfo" :trail-info="curTrailData" />
      </div>
    </transition>
    <div class="py-15">
      <GoBackIcon />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import GoBackIcon from '@/components/front/base/GoBackIcon.vue'
import PurposeTitle from '@/components/front/info/PurposeTitle.vue'
import BaseInfo from '@/components/front/info/BaseInfo.vue'
import RoadCondition from '@/components/front/info/RoadCondition.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'
import trailsNewsData from '@/data/dummy/allTrailsNews.json'

const route = useRoute()
const curTrailId = route.params.trail
const curTrailData = ref(trailsData.find((item) => item.TRAILID === curTrailId) || {})

const sectionTitle = {
  roadCondition: {
    mainTitle: {
      isClock: false,
      title: '路況即時報',
      icon: 'campaign',
      textColor: 'light'
    },
    itemTitle: [
      { type: 'TITLE', name: '警報標題' },
      { type: 'TR_SUB', name: '路段' },
      { type: 'ANN_DATE', name: '發布日期' },
      { type: 'opendate', name: '封閉起始日' },
      { type: 'closedate', name: '預計開放日' },
      { type: 'CONTENT', name: '詳細說明' }
    ]
  },
  secondaryInfo: {
    mainTitle: { isClock: false, title: '基本資訊', icon: 'park', textColor: 'dark' },
    itemTitle: [
      { type: 'TR_LENGTH', name: '路線全長' },
      { type: 'TR_TOUR', name: '預計時程' },
      { type: 'TR_PAVE', name: '路面性質' },
      { type: 'TR_POSITION', name: '所在位置' },
      { type: 'TR_ALT', name: '最高海拔(m)' },
      { type: 'TR_ALT_LOW', name: '最低海拔(m)' },
      { type: 'TR_DIF_CLASS', name: '難度等級' }
    ]
  },
  tertiaryInfo: {
    mainTitle: {
      isClock: false,
      title: '進階資訊',
      icon: 'forest',
      textColor: 'dark'
    },
    itemTitle: [
      { type: 'TR_BEST_SEASON', name: '適宜季節' },
      { type: 'TR_SPECIAL', name: '推薦景色' },
      { type: 'TR_MAIN_SYS', name: '步道主系統' },
      { type: 'TR_ENTRANCE', name: '登山口位置' },
      { type: 'TR_ADMIN', name: '管轄單位' },
      { type: 'TR_ADMIN_PHONE', name: '管轄單位聯繫' }
    ]
  }
}

const isOpenTertiaryInfo = ref(false)
function toggleTertiaryCollapse() {
  return (isOpenTertiaryInfo.value = !isOpenTertiaryInfo.value)
}
</script>
