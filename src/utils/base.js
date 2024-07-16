export const commaNumber = (num) => {
  const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return (num || 0).toString().replace(rule, ',')
}

export const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}

export const remoteRequestError = '會員功能出現異常狀況，請不吝與我們聯繫處理，謝謝您'
