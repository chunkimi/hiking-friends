<template>
  <div class="bg-primary bg-opacity-50 py-4">
    <div class="container">
      <div class="d-flex justify-content-center">
        <SearchBar
          @search-data="renderScenario.handleSearch"
          @search-reset="renderScenario.handleReset"
          :has-reset-btn="hasResetBtn"
        />
      </div>
    </div>
  </div>
  <div class="container py-15">
    <div class="d-grid gap-5" v-if="isHaveTrail">
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
        @changePage="renderByPageNum.changePage"
      />
    </div>
    <div class="d-grid gap-5 text-secondary text-center" v-else>
      <span class="material-icons fs-1 p-8"> {{ noResultTrailsMsg.icon }} </span>
      <p class="p-8 fs-5 text-secondary text-center">
        {{ noResultTrailsMsg.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { fetchTrailsInfoData } from '@/data/api/trailsApi'

import SearchBar from '@/components/front/base/SearchBar.vue'
import BrowseMode from '@/components/front/base/BrowseMode.vue'
import InfoCard from '@/components/front/list/InfoCard.vue'
import InfoColumnar from '@/components/front/list/InfoColumnar.vue'
import PaginationNav from '@/components/front/base/PaginationNav.vue'

const noResultTrailsMsg = {
  icon: 'explore',
  text: '噢噢～此路不通，再重新找步道吧！'
}
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

const hasResetBtn = true
const route = useRoute()

const curMode = ref('card')
const isCurCardMode = computed(() => {
  return curMode.value === 'card' ? true : false
})

const trailsListStore = useTrailsListStore()
const {
  currentPage,
  searchType,
  searchKeyword,
  isListAlready,
  isFromInfoToList,
  isIndexToSearch,
  isSavePage,
  isSaveKeyword,
  isTypeToSearch
} = storeToRefs(trailsListStore)

const isHaveTrail = ref(true)
const allTrails = ref([])
const filterTrails = ref([])
const isAllTrails = ref(true)
const perPageTrails = 12
const trailNum = computed(() => {
  return isAllTrails.value ? allTrails.value.length : filterTrails.value.length
})
const numberOfPages = computed(() => Math.ceil(trailNum.value / perPageTrails))

const curPageTrails = ref([])

const searchByKeyword = {
  trailName(keyword) {
    return allTrails.value.filter((item) =>
      item.TR_CNAME ? item.TR_CNAME.includes(keyword) : false
    )
  },
  trailPosition(keyword) {
    const keywordTrans = keyword.includes('台') ? keyword.replace(/台/g, '臺') : keyword
    return allTrails.value.filter((item) =>
      item.TR_POSITION ? item.TR_POSITION.includes(keywordTrans) : false
    )
  },
  trailArea(keyword) {
    return allTrails.value.filter((item) => {
      if (keyword === '北部') {
        return (
          item.TR_POSITION.includes('臺北') ||
          item.TR_POSITION.includes('新北') ||
          item.TR_POSITION.includes('基隆') ||
          item.TR_POSITION.includes('宜蘭') ||
          item.TR_POSITION.includes('桃園') ||
          item.TR_POSITION.includes('新竹')
        )
      } else if (keyword === '中部') {
        return (
          item.TR_POSITION.includes('苗栗') ||
          item.TR_POSITION.includes('臺中') ||
          item.TR_POSITION.includes('彰化') ||
          item.TR_POSITION.includes('南投') ||
          item.TR_POSITION.includes('雲林')
        )
      } else if (keyword === '南部') {
        return (
          item.TR_POSITION.includes('嘉義') ||
          item.TR_POSITION.includes('臺南') ||
          item.TR_POSITION.includes('高雄') ||
          item.TR_POSITION.includes('屏東')
        )
      } else if (keyword === '東部') {
        return item.TR_POSITION.includes('臺東') || item.TR_POSITION.includes('花蓮')
      } else {
        return false
      }
    })
  },
  trailSys(keyword) {
    return allTrails.value.filter((item) =>
      item.TR_MAIN_SYS ? item.TR_MAIN_SYS.includes(keyword) : false
    )
  },
  trailDifClass(keyword) {
    return allTrails.value.filter((item) =>
      item.TR_DIF_CLASS ? item.TR_DIF_CLASS.includes(keyword) : false
    )
  },
  trailTour(keyword) {
    return allTrails.value.filter((item) => {
      if (!item.TR_TOUR) {
        return false
      } else if (keyword === '半天') {
        return item.TR_TOUR === '半天' || item.TR_TOUR.includes('小時')
      } else if (keyword === '多日') {
        return item.TR_TOUR === '一天以上'
      } else if (keyword === '一天') {
        return item.TR_TOUR === '一天'
      }
    })
  },
  trailAll(keyword) {
    const results = []
    results.push(...this.trailName(keyword))
    results.push(...this.trailPosition(keyword))
    results.push(...this.trailArea(keyword))
    results.push(...this.trailSys(keyword))
    results.push(...this.trailTour(keyword))
    return [...new Set(results)]
  },
  scenario() {
    let rawFilter = ''
    if (searchType.value === 'trailDifClass') {
      let rawResult = searchKeyword.value.map((item) => searchByKeyword.trailDifClass(item)).flat()
      rawFilter = [...new Set(rawResult)]
    } else {
      rawFilter = searchByKeyword[`${searchType.value}`](searchKeyword.value)
    }
    return rawFilter
  }
}

const renderByPageNum = {
  pageNumInit() {
    currentPage.value = 1
    curPageTrails.value = renderByPageNum.getTrailsByPage(currentPage.value)
  },
  getTrailsByPage(pageNum) {
    const data = isAllTrails.value ? allTrails.value : filterTrails.value
    const startIndex = (pageNum - 1) * perPageTrails
    return data.slice(startIndex, startIndex + perPageTrails)
  },
  changePage(page) {
    if (page >= 1 && page <= numberOfPages.value) {
      currentPage.value = page
      curPageTrails.value = renderByPageNum.getTrailsByPage(page)
      scrollToTop()
    }
  }
}

const renderScenario = {
  handleSearch(queryValue) {
    searchKeyword.value = queryValue
    filterTrails.value = searchByKeyword.scenario()
    if (filterTrails.value.length !== 0) {
      isAllTrails.value = false
      renderByPageNum.pageNumInit()
    } else {
      isHaveTrail.value = false
      searchKeyword.value = ''
      isAllTrails.value = true
    }
  },
  handleReset(isReset) {
    if (isReset) {
      isAllTrails.value = true
      isHaveTrail.value = true
      searchType.value = 'trailAll'
      searchKeyword.value = ''
      filterTrails.value = []
      isSavePage.value = false
      isSaveKeyword.value = false
      isTypeToSearch.value = false
      renderByPageNum.pageNumInit()
    }
  },
  savePage() {
    curPageTrails.value = renderByPageNum.getTrailsByPage(currentPage.value)
    isSavePage.value = false
    isFromInfoToList.value = false
  },
  saveSearchResult() {
    filterTrails.value = searchByKeyword.scenario()
    isAllTrails.value = false
    curPageTrails.value = renderByPageNum.getTrailsByPage(currentPage.value)
    isFromInfoToList.value = false
    isSaveKeyword.value = false
    isSavePage.value = false
  },
  fromIndexToSearch(queryValue) {
    searchType.value = 'trailAll'
    renderScenario.handleSearch(queryValue)
    isIndexToSearch.value = false
  },
  fromTypeToSearch(queryType, queryValue) {
    searchType.value = queryType
    renderScenario.handleSearch(queryValue)
    isTypeToSearch.value = false
  }
}

onMounted(async () => {
  allTrails.value = await fetchTrailsInfoData()
  if (isTypeToSearch.value) {
    console.log('isTypeToSearch.value')
    const { queryType, queryValue } = route.query
    renderScenario.fromTypeToSearch(queryType, queryValue)
    return
  }
  if (isIndexToSearch.value) {
    console.log('isIndexToSearch.value')
    const rawQueryValue = route.query.queryValue
    renderScenario.fromIndexToSearch(rawQueryValue)
    return
  }
  if (isSavePage.value && isSaveKeyword.value) {
    console.log('isSavePage.value && isSaveKeyword.value')
    renderScenario.saveSearchResult()
    return
  }
  if (isSavePage.value) {
    console.log('isSavePage.value')
    renderScenario.savePage()
    return
  } else {
    console.log('else')
    searchType.value = 'trailAll'
    isAllTrails.value = true
    isListAlready.value = false
    isFromInfoToList.value = false
    isSavePage.value = false
    isSaveKeyword.value = false
    isIndexToSearch.value = false
    renderByPageNum.pageNumInit()
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (!isAllTrails.value) {
    isSaveKeyword.value = true
  }
  if (from.name === 'TrailsList' && to.name === 'TrailInfo') {
    isListAlready.value = true
    isFromInfoToList.value = true
    isSavePage.value = true
  }
  if (to.name !== 'TrailInfo' && to.name !== 'TrailsList') {
    isListAlready.value = false
  }
  next()
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
