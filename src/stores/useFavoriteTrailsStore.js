import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import axios from 'axios'
// import { useAccountStore } from '@/stores/useAccountStore.js'
// import { favTrailsListUrl, getCookie } from '@/api/accountApi.js'

// favTrailUrl, toggleFavTrailUrl

// dummyData
import dummyFavTrailsData from '@/data/dummy/favTrailsData.json'
import dummyAllTrailsData from '@/data/dummy/allTrailsInfo.json'

export const useFavoriteTrailsStore = defineStore('favoriteTrailsStore', () => {
  // const accountStore = useAccountStore()
  // const authToken = ref('')
  // const headersToken = computed(() => ({
  //   headers: {
  //     Authorization: authToken.value
  //   }
  // }))

  // const favTrailsData = ref([])

  // async function handleToFavorite(trailId) {
  //   updateAuthToken()
  //   if (!accountStore.isCheckLoginSuccess || !authToken.value || authToken.value.length <= 0) {
  //     return alert('請先登入帳戶')
  //   }
  //   const isHaveTrail = compareFavTrailsList(trailId)
  //   if (isHaveTrail) {
  //     return alert('郊友護照已有儲存這條步道')
  //   }
  //   const contentCompile = JSON.stringify({
  //     trailId
  //   })
  //   const bodyValue = {
  //     todo: {
  //       content: contentCompile
  //     }
  //   }
  //   await sendFavTrailIdRequest(bodyValue)
  // }

  // async function sendFavTrailIdRequest(bodyValue) {
  //   try {
  //     await axios.post(favTrailsListUrl, bodyValue, headersToken.value)
  //     alert('已加入待訪')
  //     sendFavListRequest()
  //   } catch (error) {
  //     console.error('Error fetching add fav trail:', error)
  //   }
  // }

  // async function sendFavListRequest() {
  //   updateAuthToken()
  //   try {
  //     const response = await axios.get(favTrailsListUrl, headersToken.value)
  //     const { todos } = response.data
  //     favTrailsData.value = translateData(todos)
  //   } catch (error) {
  //     console.error('Error fetching trails:', error)
  //   }
  // }

  // function updateAuthToken() {
  //   authToken.value = getCookie()
  // }

  // function compareFavTrailsList(curTrailId) {
  //   const result = favTrailsData.value.find((item) => item.content.trailId === curTrailId)
  //   return result ? true : false
  // }

  // function translateData(originDataArr) {
  //   return originDataArr.map((item) => ({
  //     ...item,
  //     content: JSON.parse(item.content)
  //   }))
  // }

  // dummyData
  const allTrailsData = ref(dummyAllTrailsData)
  const favTrailsData = ref(dummyFavTrailsData)

  const taskListData = computed(() => {
    if (favTrailsData.value.length === 0) return []
    let result = []
    allTrailsData.value.forEach((trailInfo) => {
      favTrailsData.value.forEach((favTrail) => {
        if (trailInfo.TRAILID === favTrail.content.TRAILID) {
          const favId = favTrail.id
          const TRAILID = favTrail?.content?.TRAILID
          const hikingState = checkContentValue(favTrail.completed_at)
          const isHaveRating = checkContentValue(favTrail?.content?.rating)
          const isHaveReviews = checkContentValue(favTrail?.content?.reviews)

          const { TR_CNAME, TR_LENGTH_NUM, TR_ADMIN, TR_ALT, TR_DIF_CLASS } = trailInfo

          const info = {
            TR_ADMIN,
            TR_LENGTH_NUM,
            TR_ALT,
            TR_DIF_CLASS
          }

          const rawResult = {
            favId,
            hikingState,
            isHaveRating,
            isHaveReviews,
            TRAILID,
            TR_CNAME,
            info
          }
          result.push(rawResult)
        }
      })
    })
    return result
  })

  const isEmptyTaskData = computed(() => (taskListData.value.length === 0 ? true : false))

  const allTrailsNum = computed(() => {
    return allTrailsData.value.length || 0
  })

  const favTrailsNum = computed(() => {
    return favTrailsData.value.length || 0
  })

  const doneTaskNum = computed(() => {
    let raw = taskListData.value.filter((item) => item.hikingState)
    return raw.length || 0
  })

  function checkContentValue(typeValue) {
    if (!typeValue || typeValue === undefined || typeValue === null) return false
    return typeValue.length > 0 || typeValue > 0 ? true : false
  }

  return {
    // handleToFavorite,
    // sendFavListRequest,
    allTrailsData,
    favTrailsData,
    allTrailsNum,
    favTrailsNum,
    doneTaskNum,
    taskListData,
    isEmptyTaskData,
    checkContentValue
  }
})
