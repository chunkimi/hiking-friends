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
  const isLoginSuccess = ref(false)
  const isCheckLoginSuccess = ref(false)
  const isLogoutSuccess = ref(false)

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

  async function sendLoginRequest(data) {
    try {
      const response = await axios.post(loginUrl, data)
      const { nickname, message } = response.data
      const { authorization } = response.headers
      document.cookie = setCookie(authorization)
      userNickname.value = nickname
      isHandleLogin.value = false
      isLoginSuccess.value = true
      alert(message)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  function checkLoginStatus() {
    const authToken = getCookie()
    if (authToken.length <= 0) {
      isCheckLoginSuccess.value = false
      document.cookie = resetCookie()
    } else {
      sendCheckLoginRequest(authToken)
    }
  }

  async function sendCheckLoginRequest(authToken) {
    try {
      await axios.get(loginCheckUrl, {
        headers: {
          Authorization: authToken
        }
      })
      isCheckLoginSuccess.value = true
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  async function sendLogoutRequest() {
    const authToken = getCookie()
    if (authToken.length <= 0) return
    try {
      const response = await axios.delete(logoutUrl, {
        headers: {
          Authorization: authToken
        }
      })
      const { message } = response.data
      resetLoginStatus()
      isLogoutSuccess.value = true
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
