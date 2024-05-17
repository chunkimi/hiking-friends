export const getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}

export const turnTrailImgPath = (imgNum) => {
  return `assets/trails-img/trailImage-${imgNum}.jpeg`
}

export const getTrailImgUrl = (trailId) => {
  return new URL(`../assets/trails-img/trailImage-${trailId}.jpeg`, import.meta.url).href
}
