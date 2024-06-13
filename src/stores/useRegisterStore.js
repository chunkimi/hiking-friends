import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { validateRule, errMsg } from '@/utils/accountRule'
import { registerUrl } from '@/api/accountApi'

export const useRegisterStore = defineStore('registerStore', () => {
  const router = useRouter()
  const registerEmail = ref('')
  const registerPassword = ref('')
  const registerPasswordCheck = ref('')
  const registerNickname = ref('')
  const isHandleRegister = ref(false)

  const emailErrMsg = computed(() => {
    if (isHandleRegister.value) {
      if (registerEmail.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.email.test(registerEmail.value)) {
        return errMsg.email
      } else {
        return ''
      }
    }
    return ''
  })

  const nicknameErrMsg = computed(() => {
    if (isHandleRegister.value) {
      if (registerNickname.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.nickname.test(registerNickname.value)) {
        return errMsg.nickname
      } else {
        return ''
      }
    }
    return ''
  })

  const passwordErrMsg = computed(() => {
    if (isHandleRegister.value) {
      if (registerPasswordCheck.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.password.test(registerPasswordCheck.value)) {
        return errMsg.password
      } else {
        return ''
      }
    }
    return ''
  })

  const passwordCheckErrMsg = computed(() => {
    if (isHandleRegister.value) {
      if (registerPasswordCheck.value.trim().length === 0) {
        return errMsg.empty
      } else if (!validateRule.password.test(registerPasswordCheck.value)) {
        return errMsg.password
      } else if (registerPasswordCheck.value !== registerPassword.value) {
        return errMsg.passwordCheck
      } else {
        return ''
      }
    }
    return ''
  })

  const isRegisterFormValid = computed(() => {
    return (
      !emailErrMsg.value &&
      !nicknameErrMsg.value &&
      !passwordErrMsg.value &&
      !passwordCheckErrMsg.value
    )
  })

  function handleRegister(e) {
    e.preventDefault()
    isHandleRegister.value = true
    if (isRegisterFormValid.value) {
      const registerData = {
        user: {
          email: registerEmail.value,
          nickname: registerNickname.value,
          password: registerPassword.value
        }
      }
      sendRegisterRequest(registerData)
    }
  }

  async function sendRegisterRequest(registerData) {
    console.log('sendRegisterRequest')
    try {
      const response = await axios.post(registerUrl, registerData)
      console.log('try-response', response)
      const { message } = response.data
      alert(message)
      setTimeout(() => {
        resetRegisterForm()
        router.push({ name: 'Login' })
      }, 500)
    } catch (error) {
      console.error('Error fetching trails:', error)
    }
  }

  function resetRegisterForm() {
    registerEmail.value = ''
    registerPassword.value = ''
    registerPasswordCheck.value = ''
    registerNickname.value = ''
    isHandleRegister.value = false
  }
  return {
    registerEmail,
    registerPassword,
    registerPasswordCheck,
    registerNickname,
    emailErrMsg,
    passwordErrMsg,
    nicknameErrMsg,
    passwordCheckErrMsg,
    isRegisterFormValid,
    handleRegister
  }
})
