<style lang="scss" scoped></style>

<template>
  <footer class="bg-light">
    <div class="container p-5 pb-10">
      <div class="d-flex flex-column gap-10 align-items-center flex-md-row justify-content-between">
        <RouterLink to="/"
          ><img :src="getImageUrl(footerInfo.logo)" alt="logo_sm" class="logo--sm"
        /></RouterLink>
        <div class="fz-xs">
          <div class="d-flex flex-column flex-lg-row justify-content-between">
            <a
              :href="`mailto:${footerInfo.mail}`"
              class="text-decoration-none link-darken d-flex justify-content-center mb-5 mb-lg-3 me-lg-5"
            >
              <span class="material-icons me-3">email</span><span>{{ footerInfo.mail }}</span>
            </a>
            <a
              :href="`tel:${footerInfo.tel}`"
              class="text-decoration-none link-darken d-flex justify-content-center mb-5 mb-lg-3"
            >
              <span class="material-icons me-3">phone</span><span>{{ footerInfo.tel }}</span>
            </a>
          </div>
          <p class="m-0 text-center">{{ footerInfo.copyright }}</p>
        </div>
        <div class="d-flex justify-content-center gap-5">
          <a
            :href="footerInfo.socialMedia.instagram"
            target="_blank"
            class="text-decoration-none link-darken"
            ><i class="bi bi-instagram fs-4"></i
          ></a>
          <a
            :href="footerInfo.socialMedia.facebook"
            target="_blank"
            class="text-decoration-none link-darken"
            ><i class="bi bi-facebook fs-4"></i
          ></a>
          <a
            :href="footerInfo.socialMedia.twitter"
            target="_blank"
            class="text-decoration-none link-darken"
            ><i class="bi bi-twitter-x fs-4"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { getImageUrl } from '@/utils/imgUrl.js'
const footerInfo = {
  logo: 'assets/logo/logo--sm.svg',
  mail: 'service@hikingfriends.com',
  tel: '+886-2-0000-0000',
  copyright: 'Copyright&nbsp © Hiking Friends 2024',
  socialMedia: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://twitter.com/'
  }
}
</script>
@/utils/imgUrl
