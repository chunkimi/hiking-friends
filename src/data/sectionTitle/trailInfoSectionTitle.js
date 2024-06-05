export const roadConditionInfo = {
  mainTitle: {
    isClock: false,
    title: '路況即時報',
    icon: 'campaign',
    textColor: 'light'
  },
  itemTitle: [
    { type: 'TITLE', name: '警報標題' },
    { type: 'TR_SUB', name: '路段' },
    { type: 'ANN_DATE', name: '發布日期' },
    { type: 'closedate', name: '封閉起始日' },
    { type: 'opendate', name: '預計開放日' },
    { type: 'CONTENT', name: '詳細說明' }
  ]
}

export const baseTrailInfo = {
  mainTitle: { isClock: false, title: '基本資訊', icon: 'park', textColor: 'dark' },
  itemTitle: [
    { type: 'TR_LENGTH', name: '路線全長' },
    { type: 'TR_TOUR', name: '預計時程' },
    { type: 'TR_PAVE', name: '路面性質' },
    { type: 'TR_POSITION', name: '所在位置' },
    { type: 'TR_ALT', name: '最高海拔(m)' },
    { type: 'TR_ALT_LOW', name: '最低海拔(m)' },
    { type: 'TR_DIF_CLASS', name: '難度等級' }
  ]
}
export const extendedTrailInfo = {
  mainTitle: {
    isClock: false,
    title: '進階資訊',
    icon: 'forest',
    textColor: 'dark'
  },
  itemTitle: [
    { type: 'TR_BEST_SEASON', name: '適宜季節' },
    { type: 'TR_SPECIAL', name: '推薦景色' },
    { type: 'TR_MAIN_SYS', name: '步道主系統' },
    { type: 'TR_ENTRANCE', name: '登山口位置' },
    { type: 'TR_ADMIN', name: '管轄單位' },
    { type: 'TR_ADMIN_PHONE', name: '管轄單位聯繫' }
  ]
}
