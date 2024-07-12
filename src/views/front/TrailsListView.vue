<template>
  <div class="bg-primary bg-opacity-50 py-4">
    <div class="container">
      <div class="d-flex justify-content-center">
        <SearchBar
          @search-data="searchbar.handleSearch"
          @search-reset="searchbar.handleReset"
          :has-reset-btn="hasResetBtn"
        />
      </div>
    </div>
  </div>
  <div class="container py-20">
    <div v-if="isHaveTrail">
      <div class="d-flex justify-content-end mb-5">
        <BrowseMode v-model:selected-mode="curMode" />
      </div>
      <div class="mb-20">
        <p class="text-secondary mb-5" v-if="isFilterData">
          <span>{{ `${trailsListConfig.searchTitle}：` }}</span>
          <span>{{ searchKeyword }}</span>
        </p>
        <div class="row" v-if="isCurCardMode">
          <InfoCard :cur-page-trails="curListData" />
        </div>
        <ol class="list-group list-group-flush" v-else>
          <InfoColumnar :cur-page-trails="curListData"></InfoColumnar>
        </ol>
      </div>
      <PaginationNav
        :current-page="curPage"
        :number-of-pages="numberOfPages"
        @changePage="changePage"
      />
    </div>
    <div class="block-spacing text-secondary text-center" v-else>
      <span class="material-icons fs-1 p-8"> {{ trailsListConfig.noResult.icon }} </span>
      <p class="p-8 fs-5 text-secondary text-center">
        {{ trailsListConfig.noResult.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { searchTrailByType } from '@/utils/trailsInfoFilterUtils.js'
import { usePaginationUtils } from '@/utils/paginationUtils.js'
import SearchBar from '@/components/front/base/SearchBar.vue'
import BrowseMode from '@/components/front/base/BrowseMode.vue'
import InfoCard from '@/components/front/list/InfoCard.vue'
import InfoColumnar from '@/components/front/list/InfoColumnar.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'

const trailsListConfig = {
  searchTitle: '搜尋關鍵字',
  noResult: {
    icon: 'explore',
    text: '噢噢～此路不通，再重新找步道吧！'
  }
}

const hasResetBtn = true

const curMode = ref('card')
const isCurCardMode = computed(() => {
  return curMode.value === 'card' ? true : false
})

const trailsListStore = useTrailsListStore()
const {
  allTrailsData,
  filterTrailsData,
  isHaveTrail,
  isFilterData,
  isSearchByOutside,
  searchKeyword,
  searchType,
  toggleReload,
  specifyCurPage
} = storeToRefs(trailsListStore)

const trailsListData = computed(() => {
  return isFilterData.value ? filterTrailsData.value : allTrailsData.value
})

const perPageTrails = 12
const { curPage, numberOfPages, curListData, changePage, pageInit, pageRest } = usePaginationUtils(
  trailsListData,
  perPageTrails,
  specifyCurPage
)

const searchbar = {
  handleSearch(queryValue) {
    searchKeyword.value = queryValue
    searchType.value = 'all'
    listSearch()
  },
  handleReset(isReset) {
    if (isReset) {
      listRest()
    }
  }
}

function listSearch() {
  filterTrailsData.value = searchTrailByType(
    allTrailsData.value,
    searchKeyword.value,
    searchType.value
  )
  if (filterTrailsData.value.length !== 0) {
    isFilterData.value = true
    isHaveTrail.value = true
    specifyCurPage.value = 1
    pageInit()
  } else {
    isHaveTrail.value = false
    searchKeyword.value = ''
  }
}

function listRest() {
  isFilterData.value = false
  filterTrailsData.value = []
  searchKeyword.value = ''
  searchType.value = ''
  isSearchByOutside.value = false
  isHaveTrail.value = true
  specifyCurPage.value = 0
  pageRest()
}

watch(
  () => toggleReload.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      pageRest()
    }
  }
)

onBeforeMount(() => {
  if (isSearchByOutside.value) {
    listSearch()
    return
  }
  if (specifyCurPage.value > 0) {
    pageInit()
    return
  } else {
    pageRest()
  }
})

onBeforeRouteLeave((to, from) => {
  if (from.name === 'TrailsList' && to.name === 'TrailInfo') {
    specifyCurPage.value = curPage.value
    return
  }
  listRest()
})
</script>
