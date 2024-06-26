import { ref, computed, watch } from 'vue'

export function usePaginationUtils(dataList) {
  const perPageTrails = 10
  const curPage = ref(1)

  const tableDataNum = computed(() => {
    return dataList.value.length
  })

  const numberOfPages = computed(() => Math.ceil(tableDataNum.value / perPageTrails))

  const curListData = ref([])

  function changePage(page) {
    if (page >= 1 && page <= numberOfPages.value) {
      curPage.value = page
      curListData.value = getDataByPage(page)
    }
  }

  function getDataByPage(pageNum) {
    const startIndex = (pageNum - 1) * perPageTrails
    return dataList.value.slice(startIndex, startIndex + perPageTrails)
  }

  function pageInit() {
    curPage.value = 1
    curListData.value = getDataByPage(curPage.value)
  }

  watch(dataList, () => {
    pageInit()
  })

  return {
    perPageTrails,
    curPage,
    tableDataNum,
    numberOfPages,
    curListData,
    changePage,
    getDataByPage,
    pageInit
  }
}
