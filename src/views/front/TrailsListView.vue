<template>
  <div class="bg-primary bg-opacity-50 py-4">
    <div class="container">
      <div class="d-flex justify-content-center"><SearchBar /></div>
    </div>
  </div>
  <div class="container py-15">
    <div class="d-grid gap-5">
      <div class="d-flex justify-content-end">
        <BrowseMode v-model:selected-mode="curMode" />
      </div>
      <div class="row" v-if="isCurCardMode">
        <InfoCard
          :trail-info-btn="trailInfoBtn"
          :cur-page-trails="curPageTrails"
          :trail-info-title="trailInfoTitle"
        />
      </div>
      <ol class="list-group list-group-flush" v-else>
        <InfoColumnar
          :trail-info-btn="trailInfoBtn"
          :cur-page-trails="curPageTrails"
          :trail-info-title="trailInfoTitle"
        ></InfoColumnar>
      </ol>
      <PaginationNav
        :current-page="currentPage"
        :number-of-pages="numberOfPages"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

import SearchBar from '@/components/front/base/SearchBar.vue'
import BrowseMode from '@/components/front/base/BrowseMode.vue'
import InfoCard from '@/components/front/list/InfoCard.vue'
import InfoColumnar from '@/components/front/list/InfoColumnar.vue'
import PaginationNav from '@/components/front/base/PaginationNav.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'

const curMode = ref('card')
const isCurCardMode = computed(() => {
  return curMode.value === 'card' ? true : false
})

const trailInfoBtn = {
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
const curPageTrails = ref([])

onMounted(() => {
  const isFromInfoToList = sessionStorage.getItem('infoToList')
  const savedPage = sessionStorage.getItem('currentPage')
  if (isFromInfoToList && savedPage) {
    trailsDataInit()
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
    return
  }
  if (savedPage) {
    currentPage.value = parseInt(savedPage)
    curPageTrails.value = getTrailsByPage(currentPage.value)
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
  } else {
    sessionStorage.setItem('listAlready', true)
    trailsDataInit()
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'TrailsList' && to.name === 'TrailInfo') {
    sessionStorage.setItem('currentPage', currentPage.value)
  }
  next()
})

function trailsDataInit() {
  currentPage.value = 1
  curPageTrails.value = getTrailsByPage(currentPage.value)
}

function getTrailsByPage(pageNum) {
  const data = filterTrails.value.length !== 0 ? filterTrails : trailsData
  const startIndex = (pageNum - 1) * perPageTrails
  return data.slice(startIndex, startIndex + perPageTrails)
}

function changePage(page) {
  if (page >= 1 && page <= numberOfPages.value) {
    currentPage.value = page
    curPageTrails.value = getTrailsByPage(page)
    scrollToTop()
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
