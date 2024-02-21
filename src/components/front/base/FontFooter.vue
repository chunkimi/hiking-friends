<style lang="scss" scoped></style>

<template>
  <footer class="bg-light">
    <div class="container p-5 pb-10">
      <div class="d-flex flex-column gap-10 align-items-center flex-md-row justify-content-between">
        <RouterLink to="/"
          ><img src="/icon/logo--sm.svg" alt="logo_sm" class="logo--sm"
        /></RouterLink>
        <div class="fz-xs">
          <div class="d-flex flex-column flex-lg-row justify-content-between">
            <a
              href="mailto:service@hikingfriends.com"
              class="text-decoration-none link-darken d-flex justify-content-center mb-5 mb-lg-3 me-lg-5"
            >
              <span class="material-icons me-3">email</span><span>service@hikingfriends.com</span>
            </a>
            <a
              href="tel:+886-2-0000-0000"
              class="text-decoration-none link-darken d-flex justify-content-center mb-5 mb-lg-3"
            >
              <span class="material-icons me-3">phone</span><span>02-0000-0000</span>
            </a>
          </div>
          <p class="m-0 text-center">Copyright © Hiking Friends 2024</p>
        </div>
        <div class="d-flex justify-content-center gap-5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            class="text-decoration-none link-darken"
            ><i class="bi bi-instagram fs-4"></i
          ></a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            class="text-decoration-none link-darken"
            ><i class="bi bi-facebook fs-4"></i
          ></a>
          <a href="https://twitter.com/" target="_blank" class="text-decoration-none link-darken"
            ><i class="bi bi-twitter-x fs-4"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
