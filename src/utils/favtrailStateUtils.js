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

export const defaultTaskItem = {
  favId: '',
  hikingState: '',
  isHaveRating: '',
  isHaveReviews: '',
  TRAILID: '',
  TR_CNAME: '',
  info: {
    TR_ADMIN: '',
    TR_LENGTH_NUM: '',
    TR_ALT: '',
    TR_DIF_CLASS: ''
  }
}

export const defaultFavData = {
  id: '',
  content: {
    TRAILID: '',
    rating: null,
    reviews: null
  },
  completed_at: null
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

export function getProgressDescription(item) {
  if (item.hikingState && item.isHaveRating && item.isHaveReviews)
    return '本項收藏步道的任務全部完成啦ヽ(●´∀`●)ﾉ '

  if (item.hikingState && item.isHaveRating && !item.isHaveReviews)
    return '評分完成，歡迎分享這趟探險的感受和體驗( • ̀ω•́ )'

  if (item.hikingState && !item.isHaveRating && !item.isHaveReviews)
    return '恭喜走完這條步道d(`･∀･)b ，評分並分享你的體驗吧～'

  return '尚未開始這條步道任務，來踏上新探險吧！ヽ(・×・´)ゞ'
}
