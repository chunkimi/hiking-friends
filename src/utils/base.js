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
