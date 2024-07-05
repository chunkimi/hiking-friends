import axios from 'axios'

export const trailsInfoUrl = 'https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail'
export const trailsConditionUrl = 'https://recreation.forest.gov.tw/mis/api/OpenStatus/Trail'

export const fetchTrailsInfoData = async () => {
  try {
    const response = await axios.get(trailsInfoUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching trails:', error)
    return []
  }
}

export const fetchTrailsNewsData = async () => {
  try {
    const response = await axios.get(trailsConditionUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching trails:', error)
    return []
  }
}
