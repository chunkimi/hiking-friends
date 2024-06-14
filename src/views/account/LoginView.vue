<style lang="scss" scoped>
@import '@/styles/main';
</style>

<template>
  <div class="container">
    <div class="row py-16">
      <div class="col-12 col-lg-6 mx-lg-auto">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1
            class="brand__img brand--lg"
            :style="{ backgroundImage: `url(${loginInfo.logoImg})` }"
          >
            {{ loginInfo.pageTitle }}
          </h1>
          <form class="d-grid gap-7 mt-7 w-100 needs-validation" novalidate>
            <div
              class="form-floating w-100"
              v-for="formItem in loginFormInputGroup"
              :key="formItem.id"
            >
              <input
                :type="formItem.type"
                :id="formItem.id"
                v-model="accountStore[formItem.storeModel]"
                class="form-control"
                :class="{ 'is-invalid': accountStore[formItem.errorMsgKey] }"
                required
              />
              <label :for="formItem.id">{{ formItem.label }}</label>
              <div class="invalid-feedback">{{ accountStore[formItem.errorMsgKey] }}</div>
            </div>
            <button type="submit" class="btn btn-darken" @click="handleUserLogin">
              {{ loginFormConfig.loginBtn }}
            </button>
            <router-link
              :to="loginFormConfig.registerPath.to"
              class="link-secondary text-center"
              aria-current="page"
              >{{ loginFormConfig.registerPath.title }}</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
import logoImg from '@/assets/logo/logo.svg'

const router = useRouter()
const accountStore = useAccountStore()
const {
  isHandleLogin,
  isCheckLoginSuccess,
  isLoginFormValid,
  loginEmail,
  loginPassword,
  isLoginSuccess
} = storeToRefs(accountStore)
const { checkLoginStatus, sendLoginRequest } = accountStore

const loginInfo = {
  logoImg,
  pageTitle: '使用者登入｜郊友趣・Hiking Friends'
}

const loginFormInputGroup = [
  {
    type: 'email',
    id: 'login-email',
    label: 'Email',
    storeModel: 'loginEmail',
    errorMsgKey: 'emailErrMsg'
  },
  {
    type: 'password',
    id: 'login-password',
    label: 'Password',
    storeModel: 'loginPassword',
    errorMsgKey: 'passwordErrMsg'
  }
]

const loginFormConfig = {
  loginBtn: '登入',
  registerPath: { title: '註冊帳號', to: { name: 'Register' } }
}

async function handleUserLogin(e) {
  e.preventDefault()
  isHandleLogin.value = true
  if (isLoginFormValid.value) {
    const loginData = {
      user: {
        email: loginEmail.value,
        password: loginPassword.value
      }
    }
    try {
      await sendLoginRequest(loginData)
      if (isLoginSuccess.value) {
        setTimeout(() => {
          router.push({ name: 'PassportIndex' })
        }, 500)
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
}

onBeforeMount(() => {
  checkLoginStatus()
  if (isCheckLoginSuccess.value) {
    setTimeout(() => {
      router.push({ name: 'PassportIndex' })
    }, 500)
  }
})
</script>
