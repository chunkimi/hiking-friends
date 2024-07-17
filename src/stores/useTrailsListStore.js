import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import { trailsInfoUrl, trailsConditionUrl } from '@/api/trailsApi'

export const useTrailsListStore = defineStore('trailListStore', () => {
  const allTrailsInfoData = ref([])
  const allTrailsConditionData = ref([])

  const isInfoRequestSuccess = ref(false)
  const isConditionRequestSuccess = ref(false)

  const isDataInitSuccess = computed(
    () => isInfoRequestSuccess.value && isConditionRequestSuccess.value
  )

  async function sendTrailsInfoRequest() {
    try {
      const response = await axios.get(trailsInfoUrl)
      allTrailsInfoData.value = response.data
      isInfoRequestSuccess.value = true
    } catch (error) {
      console.error('Error fetching trails:', error)
      return []
    }
  }

  async function sendTrailsConditionRequest() {
    try {
      const response = await axios.get(trailsConditionUrl)
      allTrailsConditionData.value = response.data
      isConditionRequestSuccess.value = true
    } catch (error) {
      console.error('Error fetching trails condition:', error)
      return []
    }
  }

  const filterTrailsData = ref([])
  const isFilterData = ref(false)
  const isSearchByOutside = ref(null)
  const searchKeyword = ref('')
  const searchType = ref('')
  const toggleReload = ref(false)
  const specifyCurPage = ref(0)

  return {
    allTrailsInfoData,
    sendTrailsInfoRequest,
    allTrailsConditionData,
    sendTrailsConditionRequest,
    filterTrailsData,
    isFilterData,
    searchKeyword,
    searchType,
    isSearchByOutside,
    toggleReload,
    specifyCurPage,
    isDataInitSuccess
  }
})
