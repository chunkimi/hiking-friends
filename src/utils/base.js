export const commaNumber = (num) => {
  const rule = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return (num || 0).toString().replace(rule, ',')
}
