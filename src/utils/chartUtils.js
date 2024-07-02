export const chartColorArr = [
  '#b294bb',
  '#d98880',
  '#e5c07b',
  '#6fa3bf',
  '#7fb3a7',
  '#ffeb3b',
  '#fdd835',
  '#9dc1bb',
  '#c3a6b1',
  '#f0ab86',
  '#b4aee8',
  '#ffadad',
  '#ffd6a5',
  '#ffc979',
  '#a0d6b4',
  '#7ac5cd'
]

export const priorityChartColor = '#ffd700'
// '#fdd835'
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
