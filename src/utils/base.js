export const getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}

export const turnTrailImgPath = (imgNum) => {
  return `assets/trailImage/trailImage-${imgNum}.jpeg`
}
