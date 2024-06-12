<style lang="scss" scoped>
@import '@/styles/main.scss';
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

          <div class="d-grid gap-7 mt-7 w-100">
            <div class="form-floating w-100">
              <input
                :type="formInput.email.type"
                class="form-control"
                :id="formInput.email.id"
                :placeholder="formInput.email.placeholder"
                v-model="email"
                required
              />
              <label :for="formInput.email.id">Email</label>
              <div class="text-danger" v-if="emailErrMsg">{{ emailErrMsg }}</div>
            </div>
            <div class="form-floating">
              <input
                :type="formInput.password.type"
                class="form-control"
                :id="formInput.password.id"
                :placeholder="formInput.password.placeholder"
                v-model="password"
                required
              />
              <label :for="formInput.password.id">{{ formInput.password.label }}</label>
              <div class="text-danger" v-if="passwordErrMsg">{{ passwordErrMsg }}</div>
            </div>
            <button type="button" class="btn btn-darken" @click="handleUserLogin">
              {{ formInput.btn }}
            </button>
            <router-link
              :to="registerPath.to"
              class="link-secondary text-center"
              aria-current="page"
              >{{ registerPath.title }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/useAccountStore.js'
const accountStore = useAccountStore()
const { email, password, emailErrMsg, passwordErrMsg, isCheckLoginSuccess } =
  storeToRefs(accountStore)
const { handleUserLogin, checkLoginStatus } = accountStore

import logoImg from '@/assets/logo/logo.svg'

const loginInfo = {
  logoImg,
  pageTitle: '使用者登入｜郊友趣・Hiking Friends'
}
const formInput = {
  email: {
    type: 'email',
    id: 'login-account',
    placeholder: '請輸入Email',
    label: 'Email'
  },
  password: {
    type: 'password',
    id: 'login-password',
    placeholder: '請輸入密碼',
    label: 'Password'
  },
  btn: '登入'
}
const registerPath = { title: '註冊帳號', to: { name: 'Register' } }
onMounted(() => {
  checkLoginStatus()
  if (isCheckLoginSuccess.value) {
    alert('已登入帳號了')
    setTimeout(() => {
      router.push({ name: 'PassportIndex' })
    }, 500)
  }
})
</script>
