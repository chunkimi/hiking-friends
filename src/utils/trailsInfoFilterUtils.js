export function searchTrailName(allData, keyword) {
  return allData.filter((item) => item.TR_CNAME && item.TR_CNAME.includes(keyword))
}

export function searchTrailPosition(allData, keyword) {
  const keywordTrans = keyword.includes('台') ? keyword.replace(/台/g, '臺') : keyword
  return allData.filter((item) => item.TR_POSITION && item.TR_POSITION.includes(keywordTrans))
}

export function searchTrailArea(allData, keyword) {
  const admins = getAdminsByRegion(keyword)
  return allData.filter((item) => item.TR_ADMIN && admins.includes(item.TR_ADMIN))
}

export function getAdminsByRegion(region) {
  switch (region) {
    case '北部':
      return ['宜蘭分署', '新竹分署']
    case '中部':
      return ['臺中分署', '南投分署']
    case '南部':
      return ['嘉義分署', '屏東分署']
    case '東部':
      return ['臺東分署', '花蓮分署']
    default:
      return []
  }
}

export function searchTrailSys(allData, keyword) {
  return allData.filter((item) => item.TR_MAIN_SYS && item.TR_MAIN_SYS.includes(keyword))
}

export function searchTrailTour(allData, keyword) {
  return allData.filter((item) => {
    if (!item.TR_TOUR) return false

    switch (keyword) {
      case '半天':
        return item.TR_TOUR === '半天' || item.TR_TOUR.includes('小時')
      case '多日':
        return item.TR_TOUR === '一天以上'
      case '一天':
        return item.TR_TOUR === '一天'
      default:
        return false
    }
  })
}

export function searchTrailDif(allData, keyword) {
  return allData.filter(
    (item) => item.TR_DIF_CLASS && parseInt(item.TR_DIF_CLASS === parseInt(keyword))
  )
}

export function searchAllType(allData, keyword) {
  const results = []
  results.push(...searchTrailName(allData, keyword))
  results.push(...searchTrailPosition(allData, keyword))
  results.push(...searchTrailArea(allData, keyword))
  results.push(...searchTrailSys(allData, keyword))
  results.push(...searchTrailTour(allData, keyword))
  return [...new Set(results)]
}

export function searchTrailByType(allData, keyword, type = 'all') {
  switch (type) {
    case 'name':
      return searchTrailName(allData, keyword)
    case 'position':
      return searchTrailPosition(allData, keyword)
    case 'area':
      return searchTrailArea(allData, keyword)
    case 'sys':
      return searchTrailSys(allData, keyword)
    case 'tour':
      return searchTrailTour(allData, keyword)
    case 'dif':
      return searchTrailDif(allData, keyword)
    default:
      return searchAllType(allData, keyword)
  }
}
