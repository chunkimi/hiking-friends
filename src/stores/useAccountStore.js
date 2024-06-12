import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { validateRule, errMsg } from '@/utils/accountRule'

import { loginUrl, loginCheckUrl } from '@/api/accountApi'

export const useAccountStore = defineStore('accountStore', () => {
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const userNickName = ref('')
  const isHandleLogin = ref(false)
  const isCheckLoginSuccess = ref(false)

  const emailErrMsg = computed(() => {
    if (isHandleLogin.value) {
      if (email.value.trim().length === 0) {
        return errMsg.empty
      }
      if (!validateRule.email.test(email.value)) {
        return errMsg.email
      }
    }
    return ''
  })

  const passwordErrMsg = computed(() => {
    if (isHandleLogin.value) {
      if (password.value.trim().length === 0) {
        return errMsg.empty
      }
      if (!validateRule.password.test(password.value)) {
        return errMsg.password
      }
    }
    return ''
  })

  const isLoginFormValid = computed(() => {
    return !emailErrMsg.value && !passwordErrMsg.value
  })

  function handleUserLogin(e) {
    e.preventDefault()
    isHandleLogin.value = true

    if (isLoginFormValid.value) {
      const loginData = {
        user: {
          email: email.value,
          password: password.value
        }
      }
      sendLoginRequest(loginData)
    }
  }

  async function sendLoginRequest(data) {
    try {
      const response = await axios.post(loginUrl, data)
      const { nickname, message } = response.data
      const { authorization } = response.headers
      document.cookie = `hikingFriendsToken=${authorization};`
      userNickName.value = nickname
      alert(message)
      setTimeout(() => {
        router.push({ name: 'PassportIndex' })
      }, 500)
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
      alert('未登入')
      setTimeout(() => {
        router.push({ name: 'Login' })
      }, 500)
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
    email,
    password,
    userNickName,
    emailErrMsg,
    passwordErrMsg,
    handleUserLogin,
    isCheckLoginSuccess,
    checkLoginStatus
  }
})
