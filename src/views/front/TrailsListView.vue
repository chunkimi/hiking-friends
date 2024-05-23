<template>
  <div class="bg-primary bg-opacity-50 py-4">
    <div class="container">
      <div class="d-flex justify-content-center">
        <SearchBar @search-data="handleSearch" @search-reset="handleReset" />
      </div>
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

const allTrails = ref(trailsData)
const searchKeyword = ref('')
const filterTrails = ref([])
const perPageTrails = 12
const isAllTrails = computed(() => (filterTrails.value.length === 0 ? true : false))

const trailNum = computed(() => {
  return isAllTrails.value ? allTrails.value.length : filterTrails.value.length
})
const numberOfPages = computed(() => Math.ceil(trailNum.value / perPageTrails))

const currentPage = ref(1)
const curPageTrails = ref([])

onMounted(() => {
  const isFromInfoToList = sessionStorage.getItem('infoToList')
  const saveKeyword = sessionStorage.getItem('searchKeyword')
  const savedPage = sessionStorage.getItem('currentPage')
  const isFromInfoToListReload = isFromInfoToList && savedPage ? true : false

  if (isFromInfoToListReload & saveKeyword || isFromInfoToListReload) {
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
    if (saveKeyword) {
      sessionStorage.removeItem('searchKeyword')
    }
    trailsDataInit()
    console.log('4+5')
    return
  }
  if (savedPage && saveKeyword) {
    searchKeyword.value = saveKeyword
    filterTrails.value = allTrails.value.filter((item) =>
      item.TR_CNAME.includes(searchKeyword.value)
    )
    currentPage.value = parseInt(savedPage)
    curPageTrails.value = getTrailsByPage(currentPage.value)
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('searchKeyword')
    console.log('3')
    return
  }
  if (savedPage) {
    currentPage.value = parseInt(savedPage)
    curPageTrails.value = getTrailsByPage(currentPage.value)
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
    console.log('2')
    return
  } else {
    sessionStorage.setItem('listAlready', true)
    trailsDataInit()
    console.log('1+6')
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (!isAllTrails.value) {
    sessionStorage.setItem('searchKeyword', searchKeyword.value)
  }
  if (from.name === 'TrailsList' && to.name === 'TrailInfo') {
    sessionStorage.setItem('currentPage', currentPage.value)
  }
  next()
})

function handleSearch(queryValue) {
  if (queryValue.length !== 0) {
    searchKeyword.value = queryValue
    filterTrails.value = allTrails.value.filter((item) =>
      item.TR_CNAME.includes(searchKeyword.value)
    )
    trailsDataInit()
  }
}

function handleReset(isReset) {
  if (isReset) {
    searchKeyword.value = ''
    filterTrails.value = []
    trailsDataInit()
  }
}

function trailsDataInit() {
  currentPage.value = 1
  curPageTrails.value = getTrailsByPage(currentPage.value)
}

function getTrailsByPage(pageNum) {
  const data = isAllTrails.value ? allTrails.value : filterTrails.value
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
