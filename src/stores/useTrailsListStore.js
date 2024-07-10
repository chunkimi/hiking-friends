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
  const isHaveTrail = ref(true)
  const filterTrailsData = ref([])
  const isFilterData = ref(false)
  const isSearchByOutside = ref(null)
  const searchKeyword = ref('')
  const searchType = ref('')
  const toggleReload = ref(false)

  return {
    allTrailsData,
    sendTrailsInfoRequest,
    allTailsCondition,
    sendTrailsConditionRequest,
    filterTrailsData,
    isHaveTrail,
    isFilterData,
    searchKeyword,
    searchType,
    isSearchByOutside,
    toggleReload
  }
})
