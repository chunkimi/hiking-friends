<style lang="scss" scoped>
.msg-collapse-enter-active,
.msg-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.msg-collapse-enter-from,
.msg-collapse-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="container d-grid gap-5">
    <div class="py-15">
      <PurposeTitle :trail-info="curTrailData"></PurposeTitle>
    </div>

    <div class="row py-15">
      <div class="col-12 col-lg-3">
        <IconTitle
          :is-clock-line="sectionTitle.roadCondition.isClock"
          :icon="sectionTitle.roadCondition.icon"
          :title-text="sectionTitle.roadCondition.title"
          :color="sectionTitle.roadCondition.textColor"
          class="mb-10"
        ></IconTitle>
      </div>
    </div>
    <div class="py-15">
      <IconTitle
        :is-clock-line="sectionTitle.baseInfo.isClock"
        :icon="sectionTitle.baseInfo.icon"
        :title-text="sectionTitle.baseInfo.title"
        :color="sectionTitle.baseInfo.textColor"
        class="mb-10"
      ></IconTitle>
    </div>
    <div class="py-15">
      <IconTitle
        :is-clock-line="sectionTitle.moreInfo.isClock"
        :icon="sectionTitle.moreInfo.icon"
        :title-text="sectionTitle.moreInfo.title"
        :color="sectionTitle.moreInfo.textColor"
        class="mb-10"
      ></IconTitle>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import PurposeTitle from '@/components/front/info/PurposeTitle.vue'
import IconTitle from '@/components/front/base/IconTitle.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'
import trailsNewsData from '@/data/dummy/allTrailsNews.json'

const route = useRoute()
const curTrailId = route.params.trail
const curTrailData = ref(trailsData.find((item) => item.TRAILID === curTrailId) || {})

const sectionTitle = {
  roadCondition: {
    isClock: false,
    title: '路況即時報',
    icon: 'campaign',
    textColor: 'dark'
  },
  baseInfo: {
    isClock: false,
    title: '基本資訊',
    icon: 'park',
    textColor: 'dark'
  },
  moreInfo: {
    isClock: false,
    title: '進階資訊',
    icon: 'forest',
    textColor: 'dark'
  }
}

// const secondInfo = [
//   { type: 'TR_POSITION', name: '所在位置' },
//   { type: 'TR_ALT', name: '最高海拔(m)' },
//   { type: 'TR_ALT_LOW', name: '最低海拔(m)' },
//   { type: 'TR_DIF_CLASS', name: '難度等級' },
//   { type: 'TR_PAVE', name: '路面性質' },
//   { type: 'TR_BEST_SEASON', name: '適宜季節' }
// ]

// const thirdInfo = [
//   { type: 'TR_MAIN_SYS', name: '步道主系統' },
//   { type: 'TR_ENTRANCE', name: '登山口位置' },
//   { type: 'TR_ADMIN', name: '管轄單位' },
//   { type: 'TR_ADMIN_PHONE', name: '管轄單位聯繫' }
// ]

// const msgInfo = [
//   { type: 'TITLE', name: '標題' },
//   { type: 'CONTENT', name: '全文' },
//   { type: 'TR_SUB', name: '路段' },
//   { type: 'ANN_DATE', name: '發布日期' },
//   { type: 'opendate', name: '封閉起始日' },
//   { type: 'closedate', name: '預計開放日' }
// ]
</script>
