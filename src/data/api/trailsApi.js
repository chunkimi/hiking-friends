import axios from 'axios'

export const trailsInfoUrl = 'https://data.moa.gov.tw/Service/OpenData/ForestRtBasic.aspx'
export const trailsConditionUrl = 'https://data.moa.gov.tw/Service/OpenData/ForestRtOpen.aspx'

export const fetchTrailsInfoData = async () => {
  try {
    const response = await axios.get(trailsInfoUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching trails:', error)
    return []
  }
}
