export const exploreGuideData = [
  {
    title: {
      isClock: true,
      title: '臺灣各地',
      icon: 'map',
      textColor: 'primary'
    },
    subtitle: '選擇心儀的目的區域',
    keywords: [
      { title: '北部地區', queryType: 'area', queryValue: '北部' },
      { title: '中部地區', queryType: 'area', queryValue: '中部' },
      { title: '南部地區', queryType: 'area', queryValue: '南部' },
      { title: '東部地區', queryType: 'area', queryValue: '東部' }
    ]
  },
  {
    title: {
      isClock: true,
      title: '分類系統',
      icon: 'mode_of_travel',
      textColor: 'info'
    },
    subtitle: '探索不同類型與定位',
    keywords: [
      { title: '國家步道', queryType: 'sys', queryValue: '國家步道' },
      { title: '區域步道', queryType: 'sys', queryValue: '區域步道' }
    ]
  },
  {
    title: {
      isClock: true,
      title: '時程導向',
      icon: 'hiking',
      textColor: 'warning'
    },
    subtitle: '根據時間計畫選擇理想步道',
    keywords: [
      { title: '半天遊程', queryType: 'tour', queryValue: '半天' },
      { title: '一天鍛鍊', queryType: 'tour', queryValue: '一天' },
      { title: '多天挑戰', queryType: 'tour', queryValue: '多天' }
    ]
  }
]

export const featureData = [
  {
    title: {
      isClock: true,
      title: '主題分類檢索',
      icon: 'landscape',
      textColor: 'primary'
    },
    subtitle: '掌握目標下腳快、狠、準',
    keywords: ['地區瀏覽', '步道分級', '預估時程', '步道類型']
  },
  {
    title: {
      isClock: true,
      title: '步道履歷報你知',
      icon: 'mode_of_travel',
      textColor: 'success'
    },
    subtitle: '資訊整合，一目瞭然',
    keywords: ['步道介紹', '路程預估', '景點推薦', '開放情況']
  },
  {
    title: {
      isClock: true,
      title: '郊友護照',
      icon: 'hiking',
      textColor: 'warning'
    },
    subtitle: '會員專屬個人步道筆記',
    keywords: ['待訪清單', '攻略紀錄']
  },
  {
    title: {
      isClock: true,
      title: '郊友分享',
      icon: 'diversity_3',
      textColor: 'danger'
    },
    subtitle: '今天去哪兒？熱門首選推薦',
    keywords: ['開發中']
  }
]

export const recommendTrails = [
  {
    card_title: '新手入門',
    title_color: 'success',
    trail_data: {
      TRAILID: '004',
      TR_CNAME: '金瓜寮魚蕨步道',
      TR_POSITION: '新北市坪林區',
      TR_LENGTH: '1公里'
    }
  },
  {
    card_title: '來點挑戰',
    title_color: 'danger',
    trail_data: {
      TRAILID: '007',
      TR_CNAME: '礁溪跑馬古道',
      TR_POSITION: '新北市坪林區、宜蘭縣礁溪鄉、宜蘭縣頭城鎮',
      TR_LENGTH: '6.7公里'
    }
  },
  {
    card_title: '進階探險',
    title_color: 'warning',
    trail_data: {
      TRAILID: '139',
      TR_CNAME: '嘉明湖國家步道',
      TR_POSITION: '台東縣海端鄉',
      TR_LENGTH: '13公里'
    }
  }
]
