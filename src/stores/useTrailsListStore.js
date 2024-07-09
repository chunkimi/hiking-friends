import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { trailsInfoUrl, trailsConditionUrl } from '@/api/trailsApi'

// dummyData
// import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'

export const useTrailsListStore = defineStore('trailListStore', () => {
  const allTrailsData = ref([])
  const allTailsCondition = ref([])

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

  // const currentPage = ref(0)
  // const isSavePage = ref(null)
  // const searchType = ref('trailAll')
  // const searchKeyword = ref('')
  // const isSaveKeyword = ref(null)
  // const isListAlready = ref(null)
  // const isFromInfoToList = ref(null)
  // const isIndexToSearch = ref(null)
  const isTypeToSearch = ref(null)

  return {
    allTrailsData,
    sendTrailsInfoRequest,
    allTailsCondition,
    sendTrailsConditionRequest,
    // currentPage,
    // searchType,
    // searchKeyword,
    // isListAlready,
    // isFromInfoToList,
    // isIndexToSearch,
    // isSavePage,
    // isSaveKeyword,
    isTypeToSearch
  }
})
