import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrailsListStore = defineStore('trailListStore', () => {
  const currentPage = ref(0)
  const isSavePage = ref(null)
  const searchType = ref('trailAll')
  const searchKeyword = ref('')
  const isSaveKeyword = ref(null)
  const isListAlready = ref(null)
  const isFromInfoToList = ref(null)
  const isIndexToSearch = ref(null)
  const isTypeToSearch = ref(null)

  return {
    currentPage,
    searchType,
    searchKeyword,
    isListAlready,
    isFromInfoToList,
    isIndexToSearch,
    isSavePage,
    isSaveKeyword,
    isTypeToSearch
  }
})
