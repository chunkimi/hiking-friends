import { ref, computed, watch } from 'vue'

export function usePaginationUtils(dataList, perPageTrails, specifyCurPage) {
  const curPage = ref(specifyCurPage && specifyCurPage.value > 0 ? specifyCurPage.value : 1)

  const tableDataNum = computed(() => (dataList.value.length ? dataList.value.length : 0))

  const numberOfPages = computed(() =>
    tableDataNum.value ? Math.ceil(tableDataNum.value / perPageTrails) : 0
  )

  const curListData = ref([])

  function changePage(page) {
    if (page >= 1 && page <= numberOfPages.value) {
      curPage.value = page
      curListData.value = getDataByPage(page)
      scrollToTop()
    }
  }

  function getDataByPage(pageNum) {
    const startIndex = (pageNum - 1) * perPageTrails
    return dataList.value.slice(startIndex, startIndex + perPageTrails)
  }

  function pageInit() {
    curListData.value = getDataByPage(curPage.value)
  }

  function pageRest() {
    curPage.value = 1
    curListData.value = getDataByPage(curPage.value)
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  watch(dataList, () => {
    pageRest()
  })

  return {
    perPageTrails,
    curPage,
    tableDataNum,
    numberOfPages,
    curListData,
    changePage,
    getDataByPage,
    pageInit,
    pageRest
  }
}
