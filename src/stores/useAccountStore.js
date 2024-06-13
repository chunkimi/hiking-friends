import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { validateRule, errMsg } from '@/utils/accountRule'
import { loginUrl, loginCheckUrl } from '@/api/accountApi'

export const useAccountStore = defineStore('accountStore', () => {
  const loginEmail = ref('')
  const loginPassword = ref('')
  const userNickname = ref('')
  const isHandleLogin = ref(false)
  const isCheckLoginSuccess = ref(false)

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
      document.cookie = `hikingFriendsToken=${authorization};`
      userNickname.value = nickname
      alert(message)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  function checkLoginStatus() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hikingFriendsToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token.length <= 0) {
      isCheckLoginSuccess.value = false
      document.cookie = 'tableProjectToken=;'
    } else {
      sendCheckLoginRequest(token)
    }
  }

  async function sendCheckLoginRequest(authToken) {
    try {
      await axios.get(loginCheckUrl, {
        headers: {
          Authorization: authToken
        }
      })
      axios.defaults.headers.common['Authorization'] = authToken
      isCheckLoginSuccess.value = true
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  return {
    loginEmail,
    loginPassword,
    userNickname,
    emailErrMsg,
    passwordErrMsg,
    isHandleLogin,
    isLoginFormValid,
    isCheckLoginSuccess,
    sendLoginRequest,
    checkLoginStatus
  }
})
