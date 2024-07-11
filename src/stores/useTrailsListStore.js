import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { trailsInfoUrl, trailsConditionUrl } from '@/api/trailsApi'

// dummyData
import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'
import dummyAllTrailsCondition from '@/data/dummy/allTrailsNews.json'

export const useTrailsListStore = defineStore('trailListStore', () => {
  const allTrailsData = ref(dummyAllTrailsData)
  const allTrailsCondition = ref(dummyAllTrailsCondition)

  // const allTrailsData = ref([])
  // const allTrailsCondition = ref([])

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
      allTrailsCondition.value = response.data
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
    allTrailsCondition,
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
