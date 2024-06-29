export const chartColorArr = ['#f3c763', '#e5c07b', '#d98880', '#6fa3bf', '#b294bb', '#7fb3a7']
export const undoneChartColor = '#d3d3d3'

export function getPalette(dataCount) {
  dataCount = Math.max(Math.floor(dataCount), 0)

  const result = []
  for (let i = 0; i < dataCount; i++) {
    result.push(chartColorArr[i % chartColorArr.length])
  }

  return result
}

export function getPaletteWithUndone(dataCount) {
  const doneNum = Math.max(Math.floor(dataCount), 0) - 1
  const rawPalette = getPalette(doneNum)
  return [...rawPalette, undoneChartColor]
}
