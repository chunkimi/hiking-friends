export const progressNode = [
  {
    type: 'favId',
    icon: 'hiking'
  },
  {
    type: 'hikingState',
    icon: 'tour'
  },
  {
    type: 'isHaveRating',
    icon: 'star'
  },
  {
    type: 'isHaveReviews',
    icon: 'rate_review'
  }
]

export function convertBooleanToIcon(value) {
  return value ? 'task_alt' : 'crop_square'
}

export function getRegionByAdmin(admin) {
  switch (admin) {
    case '宜蘭分署':
    case '新竹分署':
      return '北部'
    case '臺中分署':
    case '南投分署':
      return '中部'
    case '嘉義分署':
    case '屏東分署':
      return '南部'
    case '臺東分署':
    case '花蓮分署':
      return '東部'
    default:
      return '未知'
  }
}

export function getAllRegionFromFav(allFav) {
  const raw = []
  allFav.forEach((fav) => {
    const region = getRegionByAdmin(fav.info.TR_ADMIN)
    raw.push(region)
  })
  return [...new Set(raw)]
}
