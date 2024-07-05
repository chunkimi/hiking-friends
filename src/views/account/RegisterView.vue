<style lang="scss" scoped>
@import '@/styles/main';
.form-floating > .form-control::placeholder {
  opacity: 0;
}

.form-floating > .form-control:focus::placeholder {
  opacity: 1;
  color: $gray-500;
}
</style>

<template>
  <div class="container">
    <div class="row py-16">
      <div class="col-12 col-lg-6 mx-lg-auto">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1
            class="brand__img brand--lg"
            :style="{ backgroundImage: `url(${registerInfo.logoImg})` }"
          >
            {{ registerInfo.pageTitle }}
          </h1>
          <h2 class="h2 mt-5">{{ registerInfo.title }}</h2>
        </div>
        <form class="d-grid gap-7 mt-7 w-100 needs-validation" novalidate>
          <div class="form-floating w-100" v-for="formItem in formInputGroup" :key="formItem.id">
            <input
              :type="formItem.type"
              :id="formItem.id"
              :placeholder="formItem.placeholder"
              v-model="registerStore[formItem.storeModel]"
              @focus="formItem.isFocused = true"
              @blur="formItem.isFocused = false"
              class="form-control"
              :class="{ 'is-invalid': registerStore[formItem.errorMsgKey] }"
              required
            />
            <label :for="formItem.id">{{ formItem.label }}</label>
            <div class="invalid-feedback">{{ registerStore[formItem.errorMsgKey] }}</div>
          </div>
          <button type="button" class="btn btn-darken" @click="handleRegister">
            {{ registerFormConfig.registerBtn }}
          </button>
          <router-link
            :to="registerFormConfig.loginPath.to"
            class="link-secondary text-center"
            aria-current="page"
            >{{ registerFormConfig.loginPath.title }}</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '@/stores/useRegisterStore.js'
import { errMsg } from '@/utils/accountRule.js'
import logoImg from '@/assets/logo/logo.svg'

const registerInfo = { logoImg, pageTitle: '註冊帳號｜郊友趣・Hiking Friends', title: '註冊帳號' }

const registerFormConfig = {
  registerBtn: '註冊帳號',
  loginPath: { title: '已有帳號，回到登入頁', to: { name: 'Login' } }
}

const formInputGroup = [
  {
    type: 'email',
    id: 'register-email',
    placeholder: '請輸入Email',
    label: 'Email',
    storeModel: 'registerEmail',
    errorMsgKey: 'emailErrMsg',
    isFocused: false
  },
  {
    type: 'text',
    id: 'register-nickname',
    placeholder: errMsg.nickname,
    label: '暱稱',
    storeModel: 'registerNickname',
    errorMsgKey: 'nicknameErrMsg',
    isFocused: false
  },
  {
    type: 'password',
    id: 'register-password',
    placeholder: errMsg.password,
    label: '密碼',
    storeModel: 'registerPassword',
    errorMsgKey: 'passwordErrMsg',
    isFocused: false
  },
  {
    type: 'password',
    id: 'register-password-check',
    placeholder: errMsg.password,
    label: '再次輸入密碼',
    storeModel: 'registerPasswordCheck',
    errorMsgKey: 'passwordCheckErrMsg',
    isFocused: false
  }
]

const router = useRouter()
const registerStore = useRegisterStore()
const {
  isHandleRegister,
  isRegisterFormValid,
  registerEmail,
  registerNickname,
  registerPassword,
  isRegisterSuccess
} = storeToRefs(registerStore)
const { sendRegisterRequest } = registerStore

async function handleRegister(e) {
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
    try {
      await sendRegisterRequest(registerData)
      if (isRegisterSuccess.value) {
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 500)
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
}
</script>
