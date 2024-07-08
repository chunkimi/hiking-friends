const baseUrl = import.meta.env.VITE_ACCOUNT_BASE_URL

export const registerUrl = `${baseUrl}/users`
export const loginUrl = `${registerUrl}/sign_in`
export const logoutUrl = `${registerUrl}/sign_out`
export const loginCheckUrl = `${baseUrl}/check`

export const projectToken = 'hikingFriendsToken'
export function setCookie(authToken) {
  return `${projectToken}=${authToken};`
}
export function getCookie(tokenName = projectToken) {
  const regex = new RegExp(`(?:^|.*;\\s*)${tokenName}\\s*=\\s*([^;]*).*$|^.*$`)
  return document.cookie.replace(regex, '$1')
}
export function resetCookie() {
  return `${projectToken}=;`
}

export const favTrailsListUrl = `${baseUrl}/todos`
export const favTrailUrl = (fav_id) => `${favTrailsListUrl}/${fav_id}`
export const toggleFavUrl = (fav_id) => `${favTrailsListUrl}/${fav_id}/toggle`
