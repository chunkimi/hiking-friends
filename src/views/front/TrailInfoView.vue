<style lang="scss" scoped>
@import '@/styles/main.scss';
.trail {
  &__img {
    height: 240px;
    object-fit: cover;
    object-position: center center;
    @include media-breakpoint-up(md) {
      height: 360px;
    }
    @include media-breakpoint-up(lg) {
      height: 480px;
    }
  }
}
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
  <div class="container py-16 d-grid gap-5">
    <div class="d-flex justify-content-end">
      <RouterLink :to="{ name: 'TrailsList' }" class="btn btn-lg">
        <i class="bi bi-sign-turn-left"></i>
      </RouterLink>
    </div>
    <div class="d-flex flex-column align-items-center">
      <TopicTitle
        :title="sectionTitle.curTrail.title"
        :icon="sectionTitle.curTrail.icon"
        :circleType="sectionTitle.curTrail.circleType"
      ></TopicTitle>
      <h2 class="h2 text-success px-3">
        {{ curTailData.TR_CNAME }}
      </h2>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 mx-auto">
        <img
          :src="getImageUrl(turnTrailImgPath(curTailData.TRAILID))"
          alt="trail-img"
          class="trail__img w-100"
        />
      </div>
    </div>
    <div class="">
      <TopicTitle
        :title="sectionTitle.msg.title"
        :icon="sectionTitle.msg.icon"
        :circleType="sectionTitle.msg.circleType"
      ></TopicTitle>
      <h5 class="h5 col-12 col-lg-8 py-2 mx-auto text-center bg-danger text-light rounded-pill">
        {{ dummyMsgData.TR_TYP }}
      </h5>
      <div class="row">
        <p
          class="col-12 col-lg-8 py-2 mx-auto text-end text-primary cursor-pointer"
          @click="toggleMsgCollapse"
        >
          <span class="me-2">詳情</span>
          <i class="bi bi-arrow-down-circle"></i>
        </p>
      </div>
      <transition name="msg-collapse">
        <ul class="list-unstyled row px-4 px-md-0" v-if="isOpenMsg">
          <li
            class="col-12 col-lg-8 mx-auto py-4 mb-2 border-bottom border-secondary"
            v-for="msgItem in msgInfo"
            :key="msgItem.type"
          >
            <div class="row">
              <div class="col-4 col-lg-2">
                <h6 class="h6 m-0 px-2 lh-base">{{ msgItem.name }}</h6>
              </div>
              <div class="col-8 col-lg-10">
                <p class="m-0">{{ dummyMsgData[msgItem.type] }}</p>
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
    <div class="">
      <TopicTitle
        :title="sectionTitle.baseInfo.title"
        :icon="sectionTitle.baseInfo.icon"
        :circleType="sectionTitle.baseInfo.circleType"
        class="mb-5"
      ></TopicTitle>
      <ul class="list-unstyled row px-4 px-md-0">
        <li
          class="col-12 col-lg-8 mx-auto py-4 mb-2 border-bottom border-secondary"
          v-for="baseItem in baseInfo"
          :key="baseItem.type"
        >
          <div class="row">
            <div class="col-4 col-lg-2">
              <h6 class="h6 m-0 px-2 lh-base">{{ baseItem.name }}</h6>
            </div>
            <div class="col-8 col-lg-10">
              <p class="m-0">{{ curTailData[baseItem.type] }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="">
      <TopicTitle
        :title="sectionTitle.moreInfo.title"
        :icon="sectionTitle.moreInfo.icon"
        :circleType="sectionTitle.moreInfo.circleType"
        class="mb-5"
      ></TopicTitle>
      <ul class="list-unstyled row px-4 px-md-0">
        <li
          class="col-12 col-lg-8 mx-auto py-4 mb-2 border-bottom border-secondary"
          v-for="moreItem in moreInfo"
          :key="moreItem.type"
        >
          <div class="row">
            <div class="col-4 col-lg-2">
              <h6 class="h6 m-0 px-2 lh-base">{{ moreItem.name }}</h6>
            </div>
            <div class="col-8 col-lg-10">
              <p class="m-0">{{ curTailData[moreItem.type] }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getImageUrl, turnTrailImgPath } from '@/utils/base'
import TopicTitle from '@/components/front/base/TopicTitle.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'

const route = useRoute()
const curTailId = route.params.trail

const curTailData = trailsData.find((item) => item.TRAILID === curTailId)

const sectionTitle = {
  curTrail: {
    title: '瀏覽步道',
    icon: 'landscape',
    circleType: 'sunshine'
  },
  baseInfo: {
    title: '基本資訊',
    icon: 'hiking',
    circleType: 'sunshine'
  },
  moreInfo: {
    title: '進階資訊',
    icon: 'map',
    circleType: 'sunshine'
  },
  msg: {
    title: '路況公告',
    icon: 'signpost',
    circleType: 'sunshine'
  }
}

const baseInfo = [
  { type: 'TR_POSITION', name: '所在位置' },
  { type: 'TR_ALT', name: '最高海拔(m)' },
  { type: 'TR_ALT_LOW', name: '最低海拔(m)' },
  { type: 'TR_LENGTH', name: '步道長度' },
  { type: 'TR_TOUR', name: '遊程時間' },
  { type: 'TR_DIF_CLASS', name: '難度等級' },
  { type: 'TR_PAVE', name: '路面性質' },
  { type: 'TR_BEST_SEASON', name: '適宜季節' },
  { type: 'GUIDE_CONTENT', name: '景點介紹' }
]

const moreInfo = [
  { type: 'TR_MAIN_SYS', name: '步道主系統' },
  { type: 'TR_ENTRANCE', name: '登山口位置' },
  { type: 'TR_ADMIN', name: '管轄單位' },
  { type: 'TR_ADMIN_PHONE', name: '管轄單位聯繫' }
]

const msgInfo = [
  { type: 'TITLE', name: '標題' },
  { type: 'CONTENT', name: '全文' },
  { type: 'TR_SUB', name: '路段' },
  { type: 'ANN_DATE', name: '發布日期' },
  { type: 'opendate', name: '封閉起始日' },
  { type: 'closedate', name: '預計開放日' }
]
const dummyMsgData = {
  TRAILID: '001',
  TR_CNAME: '蘇花古道：大南澳越嶺段',
  TR_TYP: '暫停開放',
  TITLE: '受4月3日地震後土石鬆動，已有崩塌與落石狀況，本步道暫停開放，請勿進入。',
  CONTENT: '受4月3日地震後土石鬆動，已有崩塌與落石狀況，本步道暫停開放，請勿進入。',
  ANN_DATE: '20240409',
  opendate: '20240423',
  closedate: '20240409',
  TR_SUB: '全線',
  DEP_NAME: '宜蘭分署'
}

const isOpenMsg = ref(false)
function toggleMsgCollapse() {
  return (isOpenMsg.value = !isOpenMsg.value)
}
</script>
