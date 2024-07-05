import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { validateRule, errMsg } from '@/utils/accountRule'
import {
  loginUrl,
  loginCheckUrl,
  logoutUrl,
  setCookie,
  getCookie,
  resetCookie
} from '@/api/accountApi'

export const useAccountStore = defineStore('accountStore', () => {
  const loginEmail = ref('')
  const loginPassword = ref('')
  const userNickname = ref('')
  const isHandleLogin = ref(false)
  const isCheckLoginSuccess = ref(false)
  const isLoginSuccess = computed(() => (userNickname.value ? true : false))
  const isLogoutSuccess = computed(() => (!userNickname.value ? true : false))
  const emailErrMsg = computed(() => {
    if (isHandleLogin.value) {
      if (loginEmail.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.email.test(loginEmail.value)) {
        return errMsg.email
      } else {
        return ''
      }
    }
    return ''
  })
  const passwordErrMsg = computed(() => {
    if (isHandleLogin.value) {
      if (loginPassword.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.password.test(loginPassword.value)) {
        return errMsg.password
      } else {
        return ''
      }
    }
    return ''
  })
  const isLoginFormValid = computed(() => {
    return !emailErrMsg.value && !passwordErrMsg.value
  })

  const authToken = ref('')
  const headersToken = computed(() => ({
    headers: {
      Authorization: authToken.value
    }
  }))

  async function sendLoginRequest(data) {
    try {
      const response = await axios.post(loginUrl, data)
      const { nickname, message } = response.data
      const { authorization } = response.headers
      document.cookie = setCookie(authorization)
      userNickname.value = nickname
      isHandleLogin.value = false
      alert(message)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  async function checkLoginStatus() {
    updateAuthToken()
    if (!userNickname.value || !authToken.value || authToken.value.length <= 0) {
      resetLoginStatus()
    } else {
      await sendCheckLoginRequest()
    }
  }

  async function sendCheckLoginRequest() {
    try {
      await axios.get(loginCheckUrl, headersToken.value)
      isCheckLoginSuccess.value = true
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  async function sendLogoutRequest() {
    updateAuthToken()
    if (!authToken.value || authToken.value.length <= 0) return
    try {
      const response = await axios.delete(logoutUrl, headersToken.value)
      const { message } = response.data
      resetLoginStatus()
      alert(message)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  function resetLoginStatus() {
    loginEmail.value = ''
    loginPassword.value = ''
    userNickname.value = ''
    isCheckLoginSuccess.value = false
    document.cookie = resetCookie()
  }

  function updateAuthToken() {
    authToken.value = getCookie()
  }

  return {
    loginEmail,
    loginPassword,
    userNickname,
    emailErrMsg,
    passwordErrMsg,
    isHandleLogin,
    isLoginFormValid,
    isLoginSuccess,
    isCheckLoginSuccess,
    sendLoginRequest,
    checkLoginStatus,
    isLogoutSuccess,
    sendLogoutRequest
  }
})
