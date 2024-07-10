import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { trailsInfoUrl, trailsConditionUrl } from '@/api/trailsApi'

// dummyData
import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'
import dummyAllTailsCondition from '@/data/dummy/allTrailsNews.json'

export const useTrailsListStore = defineStore('trailListStore', () => {
  const allTrailsData = ref(dummyAllTrailsData)
  const allTailsCondition = ref(dummyAllTailsCondition)

  // const allTrailsData = ref([])
  // const allTailsCondition = ref([])

  async function sendTrailsInfoRequest() {
    try {
      const response = await axios.get(trailsInfoUrl)
      allTrailsData.value = response.data
    } catch (error) {
      console.error('Error fetching trails:', error)
      return []
    }
  }

  async function sendTrailsConditionRequest() {
    try {
      const response = await axios.get(trailsConditionUrl)
      allTailsCondition.value = response.data
    } catch (error) {
      console.error('Error fetching trails:', error)
      return []
    }
  }

  const isSearchByOutside = ref(null)
  const searchKeyword = ref('')
  const searchType = ref('')
  const isTypeToSearch = ref(null)
  // const currentPage = ref(0)
  // const isSavePage = ref(null)
  // const isSaveKeyword = ref(null)
  // const isListAlready = ref(null)
  // const isFromInfoToList = ref(null)

  return {
    allTrailsData,
    sendTrailsInfoRequest,
    allTailsCondition,
    sendTrailsConditionRequest,
    searchKeyword,
    searchType,
    isSearchByOutside,
    isTypeToSearch
    // currentPage,
    // isListAlready,
    // isFromInfoToList,
    // isSavePage,
    // isSaveKeyword,
  }
})
