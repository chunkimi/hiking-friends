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

  async function handleToFavorite(trailId) {
    updateAuthToken()
    console.log('authToken.value', authToken.value)
    if (!accountStore.isCheckLoginSuccess || !authToken.value || authToken.value.length <= 0) {
      alert('請先登入帳戶')
      return
    } else {
      const contentObject = {
        trailId
      }
      const contentCompile = JSON.stringify(contentObject)
      const bodyValue = {
        todo: {
          content: contentCompile
        }
      }
      await sendFavTrailIdRequest(bodyValue)
    }
  }

  async function sendFavTrailIdRequest(bodyValue) {
    try {
       await axios.post(favTrailsListUrl, bodyValue, headersToken.value)
      alert('已加入待訪')
    } catch (error) {
      console.error('Error fetching add fav trail:', error)
    }
  }

  function updateAuthToken() {
    authToken.value = getCookie()
  }

  return {
    handleToFavorite
  }
})
