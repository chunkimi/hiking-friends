<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>

<template>
  <div class="container">
    <div class="row py-16">
      <div class="col-12 col-lg-6 mx-lg-auto">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1 class="brand__img brand--lg" :style="{ backgroundImage: `url(${loginInfo.logo})` }">
            使用者登入｜郊友趣・Hiking Friends
          </h1>

          <div class="d-grid gap-5 mt-7">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="login-account"
                placeholder="請輸入Email"
              />
              <label for="login-account">Email</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="login-password"
                placeholder="請輸入密碼"
              />
              <label for="login-password">Password</label>
            </div>
            <button type="button" class="btn btn-darken">登入</button>
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
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo/logo.svg'
const loginInfo = { logo }
const registerPath = { title: '註冊帳號', to: { name: 'Register' } }
</script>
