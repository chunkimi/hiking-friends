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
        @changePage="renderByPageNum.changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

import SearchBar from '@/components/front/base/SearchBar.vue'
import BrowseMode from '@/components/front/base/BrowseMode.vue'
import InfoCard from '@/components/front/list/InfoCard.vue'
import InfoColumnar from '@/components/front/list/InfoColumnar.vue'
import PaginationNav from '@/components/front/base/PaginationNav.vue'

import trailsData from '@/data/dummy/allTrailsInfo.json'

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
    results.push(...this.trailDifClass(keyword))
    results.push(...this.trailTour(keyword))
    return [...new Set(results)]
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
  savePage(savedPage) {
    currentPage.value = parseInt(savedPage)
    curPageTrails.value = renderByPageNum.getTrailsByPage(currentPage.value)
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
  },
  saveSearchResult(savedPage, saveKeyword) {
    searchKeyword.value = saveKeyword
    filterTrails.value = searchByKeyword.trailAll(searchKeyword.value)
    currentPage.value = parseInt(savedPage)
    curPageTrails.value = renderByPageNum.getTrailsByPage(currentPage.value)
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('searchKeyword')
  },
  handleSearch(queryValue) {
    if (queryValue.length !== 0) {
      searchKeyword.value = queryValue
      filterTrails.value = searchByKeyword.trailAll(searchKeyword.value)
      renderByPageNum.pageNumInit()
    }
  },
  handleReset(isReset) {
    if (isReset) {
      searchKeyword.value = ''
      filterTrails.value = []
      renderByPageNum.pageNumInit()
    }
  },
  fromInfoToList(saveKeyword) {
    sessionStorage.removeItem('currentPage')
    sessionStorage.removeItem('infoToList')
    if (saveKeyword) {
      sessionStorage.removeItem('searchKeyword')
    }
    renderByPageNum.pageNumInit()
  },
  fromIndexToSearch() {
    const route = useRoute()
    searchKeyword.value = route.query.queryValue
    filterTrails.value = searchByKeyword.trailAll(searchKeyword.value)
    sessionStorage.removeItem('indexToSearch')
    sessionStorage.setItem('listAlready', true)
    renderByPageNum.pageNumInit()
  }
}

const hasResetBtn = true
const curMode = ref('card')
const isCurCardMode = computed(() => {
  return curMode.value === 'card' ? true : false
})
const allTrails = ref(trailsData)
const searchKeyword = ref('')
const filterTrails = ref([])
const isAllTrails = computed(() => (filterTrails.value.length === 0 ? true : false))
const perPageTrails = 12
const trailNum = computed(() => {
  return isAllTrails.value ? allTrails.value.length : filterTrails.value.length
})
const numberOfPages = computed(() => Math.ceil(trailNum.value / perPageTrails))

const currentPage = ref(1)
const curPageTrails = ref([])

onMounted(() => {
  const isIndexToSearch = sessionStorage.getItem('indexToSearch')
  const isFromInfoToList = sessionStorage.getItem('infoToList')
  const saveKeyword = sessionStorage.getItem('searchKeyword')
  const savedPage = sessionStorage.getItem('currentPage')
  const isFromInfoToListReload = isFromInfoToList && savedPage ? true : false

  if (isIndexToSearch) {
    renderScenario.fromIndexToSearch()
    console.log('從首頁進入搜尋')
    return
  }
  if (isFromInfoToListReload & saveKeyword || isFromInfoToListReload) {
    renderScenario.fromInfoToList(saveKeyword)
    console.log('4+5')
    return
  }
  if (savedPage && saveKeyword) {
    renderScenario.saveSearchResult(savedPage, saveKeyword)
    console.log('3')
    return
  }
  if (savedPage) {
    renderScenario.savePage(savedPage)
    console.log('2')
    return
  } else {
    sessionStorage.setItem('listAlready', true)
    renderByPageNum.pageNumInit()
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
  if (to.name !== 'TrailInfo' && to.name !== 'TrailsList') {
    sessionStorage.removeItem('listAlready')
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
