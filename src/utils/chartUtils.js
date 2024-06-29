export const chartColorArr = [
  '#e5c07b',
  '#d98880',
  '#6fa3bf',
  '#b294bb',
  '#d2b48c',
  '#7fb3a7',
  '#ffeb3b'
]
export const priorityChartColor = '#ffd700'
export const undoneChartColor = '#d3d3d3'

export function getChartArrColor(index) {
  return chartColorArr[index % chartColorArr.length]
}

export function getPalette(dataCount) {
  dataCount = Math.max(Math.floor(dataCount), 0)

  const result = []
  for (let i = 0; i < dataCount; i++) {
    result.push(getChartArrColor(i))
  }

  return result
}

export function getPaletteWithUndone(dataCount) {
  const doneNum = Math.max(Math.floor(dataCount), 0) - 1
  const rawPalette = getPalette(doneNum)
  return [...rawPalette, undoneChartColor]
}
