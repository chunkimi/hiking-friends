<style lang="scss" scoped>
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
    <div class="py-15">
      <PurposeTitle :trail-info="curTrailData" />
    </div>
    <div class="row py-15">
      <div class="col-12 col-lg-3"></div>
    </div>
    <div class="py-15">
      <BaseInfo :title="sectionTitle.secondaryInfo" :trail-info="curTrailData" />
      <div class="d-flex justify-content-center py-8">
        <button
          type="button"
          class="btn btn-sm border border-secondary rounded-circle"
          @click="toggleTertiaryCollapse"
        >
          <span class="material-icons"> expand_more </span>
        </button>
      </div>
    </div>
    <transition name="tertiaryInfo-collapse">
      <div class="py-15" v-if="isOpenTertiaryInfo">
        <BaseInfo :title="sectionTitle.tertiaryInfo" :trail-info="curTrailData" />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import PurposeTitle from '@/components/front/info/PurposeTitle.vue'
import BaseInfo from '@/components/front/info/BaseInfo.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'
// import trailsNewsData from '@/data/dummy/allTrailsNews.json'

const route = useRoute()
const curTrailId = route.params.trail
const curTrailData = ref(trailsData.find((item) => item.TRAILID === curTrailId) || {})

const sectionTitle = {
  roadCondition: {
    mainTitle: {
      isClock: false,
      title: '路況即時報',
      icon: 'campaign',
      textColor: 'dark'
    },
    itemTitle: [
      { type: 'TITLE', name: '標題' },
      { type: 'CONTENT', name: '全文' },
      { type: 'TR_SUB', name: '路段' },
      { type: 'ANN_DATE', name: '發布日期' },
      { type: 'opendate', name: '封閉起始日' },
      { type: 'closedate', name: '預計開放日' }
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
