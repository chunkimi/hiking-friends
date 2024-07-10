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
      <div class="d-flex justify-content-end">
        <BrowseMode v-model:selected-mode="curMode" />
      </div>
      <div class="row" v-if="isCurCardMode">
        <InfoCard
          :trail-info-btn="trailInfoBtn"
          :cur-page-trails="curListData"
          :trail-info-title="trailInfoTitle"
        />
      </div>
      <ol class="list-group list-group-flush" v-else>
        <InfoColumnar
          :trail-info-btn="trailInfoBtn"
          :cur-page-trails="curListData"
          :trail-info-title="trailInfoTitle"
        ></InfoColumnar>
      </ol>
      <PaginationNav
        :current-page="curPage"
        :number-of-pages="numberOfPages"
        @changePage="changePage"
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
import { ref, computed, onMounted, onBeforeMount } from 'vue'
// import { ref, computed, onMounted, onBeforeMount } from 'vue'
// import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { searchTrailByType } from '@/utils/trailsInfoFilterUtils.js'
import { usePaginationUtils } from '@/utils/paginationUtils.js'
import SearchBar from '@/components/front/base/SearchBar.vue'
import BrowseMode from '@/components/front/base/BrowseMode.vue'
import InfoCard from '@/components/front/list/InfoCard.vue'
import InfoColumnar from '@/components/front/list/InfoColumnar.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'

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

const curMode = ref('card')
const isCurCardMode = computed(() => {
  return curMode.value === 'card' ? true : false
})

// const route = useRoute()

const trailsListStore = useTrailsListStore()
const { allTrailsData, isSearchByOutside, searchKeyword, searchType } = storeToRefs(trailsListStore)

const isHaveTrail = ref(true)
const filterTrailsData = ref([])
const isFilterData = ref(false)
const trailsListData = computed(() => {
  return isFilterData.value ? filterTrailsData.value : allTrailsData.value
})

const perPageTrails = 12
const { curPage, numberOfPages, curListData, changePage, pageInit } = usePaginationUtils(
  trailsListData,
  perPageTrails
)

onMounted(() => {
  pageInit()
})

const searchbar = {
  handleSearch(queryValue) {
    searchKeyword.value = queryValue
    searchType.value = 'all'
    listSearch()
  },
  handleReset(isReset) {
    if (isReset) {
      isFilterData.value = false
      filterTrailsData.value = []
      searchKeyword.value = ''
      searchType.value = ''
      isSearchByOutside.value = false
      isHaveTrail.value = true
      pageInit()
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

onBeforeMount(() => {
  if (isSearchByOutside.value) {
    listSearch()
  } else {
    isFilterData.value = false
    pageInit()
  }
})
</script>
