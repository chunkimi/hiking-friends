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
  <div class="container py-15">
    <div class="d-grid gap-5" v-if="isHaveTrail">
      <p class="text-secondary" v-if="isFilterData">
        <span>{{ `${trailsListConfig.searchTitle}：` }}</span>
        <span>{{ searchKeyword }}</span>
      </p>
      <div class="d-flex justify-content-end">
        <BrowseMode v-model:selected-mode="curMode" />
      </div>
      <div class="row" v-if="isCurCardMode">
        <InfoCard :cur-page-trails="curListData" />
      </div>
      <ol class="list-group list-group-flush" v-else>
        <InfoColumnar :cur-page-trails="curListData"></InfoColumnar>
      </ol>
      <PaginationNav
        :current-page="curPage"
        :number-of-pages="numberOfPages"
        @changePage="changePage"
      />
    </div>
    <div class="d-grid gap-5 text-secondary text-center" v-else>
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
// import { useRoute } from 'vue-router'
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
  toggleReload
} = storeToRefs(trailsListStore)

const trailsListData = computed(() => {
  return isFilterData.value ? filterTrailsData.value : allTrailsData.value
})

const perPageTrails = 12
const { curPage, numberOfPages, curListData, changePage, pageInit } = usePaginationUtils(
  trailsListData,
  perPageTrails
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
  pageInit()
}

// const route = useRoute()
watch(
  () => toggleReload.value,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      listRest()
    }
  }
)

onBeforeMount(() => {
  if (isSearchByOutside.value) {
    listSearch()
    return
  } else {
    pageInit()
  }
})

onBeforeRouteLeave((to, from) => {
  if (from.name === 'TrailsList' && to.name === 'TrailInfo' && isFilterData.value) {
    return
  }
  listRest()
})
</script>
