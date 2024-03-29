<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div class="row py-16">
      <div class="col-12 col-lg-6 mx-lg-auto">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h1
            class="brand__img brand--lg"
            :style="{ backgroundImage: `url(${registerInfo.logo})` }"
          >
            註冊帳號｜郊友趣・Hiking Friends
          </h1>
          <h2 class="h2 mt-5">註冊帳號</h2>
        </div>
        <form class="d-grid gap-5 mb-5">
          <div class="">
            <label for="register-name" class="form-label">名稱</label>
            <input
              type="text"
              class="form-control"
              id="register-name"
              placeholder="請輸入使用者名稱"
            />
          </div>
          <div class="">
            <label for="register-email" class="form-label">Email </label>
            <input type="email" class="form-control" id="register-email" placeholder="請輸入暱稱" />
          </div>
          <div class="">
            <label for="register-password" class="form-label">密碼</label>
            <input
              type="password"
              class="form-control"
              id="register-password"
              placeholder="請輸入密碼"
            />
          </div>
          <div class="">
            <label for="register-password-check" class="form-label">再次輸入密碼</label>
            <input
              type="password"
              class="form-control"
              id="register-password-check"
              placeholder="請再次輸入密碼"
            />
          </div>
          <button type="submit" class="btn btn-primary">註冊帳號</button>
        </form>
        <div class="d-flex justify-content-center">
          <router-link :to="loginPath.to" class="link-secondary text-center" aria-current="page">{{
            loginPath.title
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo/logo.svg'
const registerInfo = { logo }

const loginPath = { title: '已有帳號，回到登入頁', to: { name: 'Login' } }
</script>
