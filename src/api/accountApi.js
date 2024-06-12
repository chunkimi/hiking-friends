const baseUrl = import.meta.env.VITE_BASE_URL

export const registerUrl = `${baseUrl}/users`
export const loginUrl = `${registerUrl}/sign_in`
export const logoutUrl = `${registerUrl}/sign_out`
export const loginCheckUrl = `${baseUrl}/check`
