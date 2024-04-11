<style lang="scss" scoped>
@import '@/styles/main.scss';
.icon-me {
  margin-right: $spacer * 0.5;
}
.trail-card {
  &__icon--me {
    margin-right: $spacer * 0.5;
  }
  &__img {
    height: 240px;
    object-fit: cover;
    object-position: center center;
  }
  &__text {
    max-width: 60vw;
    @include media-breakpoint-up(md) {
      max-width: 20vw;
    }
  }
}
</style>

<template>
  <div class="bg-primary opacity-50 py-4">
    <div class="container">
      <div class="d-flex justify-content-center"><SearchBar /></div>
    </div>
  </div>
  <div class="container py-15">
    <div class="d-grid gap-5">
      <div class="d-flex justify-content-end">
        <i
          class="bi bi-grid fs-5 fw-bold me-3"
          @click="switchMode('card')"
          :class="isCurCardMode ? 'text-primary' : 'text-darken'"
        ></i>
        <i
          class="bi bi-list-ul fs-5 fw-bold"
          @click="switchMode('list')"
          :class="isCurCardMode ? 'text-darken' : 'text-primary'"
        ></i>
      </div>
      <div class="row" v-if="isCurCardMode">
        <div
          class="col-12 col-md-6 col-lg-4 mb-5"
          v-for="trailItem in curPageTrails"
          :key="trailItem.TRAILID"
        >
          <div class="card">
            <img
              :src="getImageUrl(turnTrailImgPath(trailItem.TRAILID))"
              class="trail-card__img card-img-top"
              alt="trail-img"
            />
            <div class="card-body">
              <h5 class="card-title">{{ trailItem.TR_CNAME }}</h5>
              <div class="card-text">
                <ul class="list-unstyled">
                  <li v-for="infoItem in trailInfoTitle" :key="infoItem.type" class="d-flex">
                    <h6 class="h6">
                      <i class="bi trail-card__icon--me" :class="infoItem.icon"></i
                      >{{ infoItem.name }}：
                    </h6>
                    <p class="mb-2 d-inline-block trail-card__text text-truncate">
                      {{ trailItem[infoItem.type] }}
                    </p>
                  </li>
                </ul>
              </div>
              <div class="row">
                <div class="col-6">
                  <RouterLink
                    :to="{
                      name: trailCardBtn.moreInfo.pathName,
                      params: { trail: trailItem.TRAILID }
                    }"
                    class="btn w-100"
                    :class="`btn-outline-${trailCardBtn.moreInfo.btnColor}`"
                    >{{ trailCardBtn.moreInfo.name }}</RouterLink
                  >
                </div>
                <div class="col-6">
                  <RouterLink
                    to="/"
                    class="btn w-100"
                    :class="`btn-outline-${trailCardBtn.addList.btnColor}`"
                    >{{ trailCardBtn.addList.name }}</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ol class="list-group list-group-flush" v-else>
        <li
          class="list-group-item py-2"
          v-for="trailItem in curPageTrails"
          :key="trailItem.TRAILID"
        >
          <div class="d-flex justify-content-between">
            <h5 class="h5">{{ trailItem.TR_CNAME }}</h5>
            <div class="d-flex">
              <RouterLink
                :to="{
                  name: trailCardBtn.moreInfo.pathName,
                  params: { trail: trailItem.TRAILID }
                }"
                class="btn w-100 me-3"
                :class="`btn-outline-${trailCardBtn.moreInfo.btnColor}`"
                ><i class="bi" :class="trailCardBtn.moreInfo.icon"></i
              ></RouterLink>
              <RouterLink
                to="/"
                class="btn w-100"
                :class="`btn-outline-${trailCardBtn.addList.btnColor}`"
                ><i class="bi" :class="trailCardBtn.addList.icon"></i
              ></RouterLink>
            </div>
          </div>
          <ul class="list-unstyled row" v-if="isMediaMdUp">
            <li
              class="col-md-6 col-lg-3 d-flex"
              v-for="infoItem in trailInfoTitle"
              :key="infoItem.type"
            >
              <h6 class="h6">
                <i class="bi trail-card__icon--me" :class="infoItem.icon"></i>{{ infoItem.name }}：
              </h6>
              <p class="mb-2 d-inline-block trail-card__text text-truncate">
                {{ trailItem[infoItem.type] }}
              </p>
            </li>
          </ul>
        </li>
        <li class="list-group-item py-3">An item</li>
      </ol>
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" @click="changePage(currentPage - 1)">
                  <p class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </p>
                </li>
                <li
                  class="page-item"
                  v-for="page in numberOfPages"
                  :key="page"
                  @click="changePage(page)"
                >
                  <p class="page-link" href="#">{{ page }}</p>
                </li>
                <li class="page-item" @click="changePage(currentPage + 1)">
                  <p class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getImageUrl, turnTrailImgPath } from '@/utils/base'
import SearchBar from '@/components/front/base/SearchBar.vue'

import { useMediaQuery } from '@vueuse/core'
const isMediaMdUp = useMediaQuery('(min-width: 767px)')

import trailsData from '@/data/dummy/allTrailsInfo.json'

const trailCardBtn = {
  moreInfo: {
    name: '詳細資料',
    btnColor: 'secondary',
    icon: 'bi-info-lg',
    pathName: 'TrailInfo'
  },
  addList: {
    name: '加入待訪',
    btnColor: 'primary',
    icon: 'bi-heart'
  }
}

const trailInfoTitle = [
  { type: 'TR_POSITION', name: '位置', icon: 'bi-map' },
  { type: 'TR_LENGTH', name: '全長', icon: 'bi-person-walking' },
  { type: 'TR_TOUR', name: '時間', icon: 'bi-clock' },
  { type: 'TR_DIF_CLASS', name: '難度', icon: 'bi-reception-4' }
]

const perPageTrails = 12
const trailNum = ref(trailsData.length)
const numberOfPages = computed(() => Math.ceil(trailNum.value / perPageTrails))
const currentPage = ref(1)
const filterTrails = ref([])
const curPageTrails = ref(getTrailsByPage(currentPage.value))

function getTrailsByPage(pageNum) {
  const data = filterTrails.value.length !== 0 ? filterTrails : trailsData
  const startIndex = (pageNum - 1) * perPageTrails
  return data.slice(startIndex, startIndex + perPageTrails)
}

function changePage(page) {
  if (page >= 1 && page <= numberOfPages.value) {
    currentPage.value = page
    curPageTrails.value = getTrailsByPage(page)
    console.log('changePage', page)
  }
}

let isCurCardMode = ref(true)
function switchMode(mode) {
  console.log('isCurCardMode', isCurCardMode.value)
  console.log('switchMode', mode)
  const isCard = mode === 'card' ? true : false
  if (isCurCardMode.value === isCard) return
  if (isCurCardMode.value !== isCard) {
    isCurCardMode.value = !isCurCardMode.value
  }
}
</script>
