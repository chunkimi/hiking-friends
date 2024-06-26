import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axios from 'axios'
import { useAccountStore } from '@/stores/useAccountStore.js'
import { favTrailsListUrl, getCookie } from '@/api/accountApi.js'

// favTrailUrl, toggleFavTrailUrl

export const useFavoriteTrailsStore = defineStore('favoriteTrailsStore', () => {
  const accountStore = useAccountStore()
  const authToken = ref('')
  const headersToken = computed(() => ({
    headers: {
      Authorization: authToken.value
    }
  }))

  const favTrailsData = ref([])

  async function handleToFavorite(trailId) {
    updateAuthToken()
    if (!accountStore.isCheckLoginSuccess || !authToken.value || authToken.value.length <= 0) {
      return alert('請先登入帳戶')
    }
    const isHaveTrail = compareFavTrailsList(trailId)
    if (isHaveTrail) {
      return alert('郊友護照已有儲存這條步道')
    }
    const contentCompile = JSON.stringify({
      trailId
    })
    const bodyValue = {
      todo: {
        content: contentCompile
      }
    }
    await sendFavTrailIdRequest(bodyValue)
  }

  async function sendFavTrailIdRequest(bodyValue) {
    try {
      await axios.post(favTrailsListUrl, bodyValue, headersToken.value)
      alert('已加入待訪')
      sendFavListRequest()
    } catch (error) {
      console.error('Error fetching add fav trail:', error)
    }
  }

  async function sendFavListRequest() {
    updateAuthToken()
    try {
      const response = await axios.get(favTrailsListUrl, headersToken.value)
      const { todos } = response.data
      favTrailsData.value = translateData(todos)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  function updateAuthToken() {
    authToken.value = getCookie()
  }

  function compareFavTrailsList(curTrailId) {
    const result = favTrailsData.value.find((item) => item.content.trailId === curTrailId)
    return result ? true : false
  }

  function translateData(originDataArr) {
    return originDataArr.map((item) => ({
      ...item,
      content: JSON.parse(item.content)
    }))
  }

  return {
    handleToFavorite,
    sendFavListRequest
  }
})
