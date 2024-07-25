<template>
  <div class="container">
    <div class="block-spacing">
      <h1 class="h1 text-end text-primary">{{ guideConfig.pageTitle }}</h1>
      <div class="vh-50 d-flex flex-column justify-content-evenly">
        <div class="mb-5">
          <h2 class="display-5 text-secondary">{{ platformInfo.title }}</h2>
          <h3 class="fs-4 text-secondary">
            <span>{{ platformInfo.slogan.main }}</span>
            <span>，</span>
            <span>{{ platformInfo.slogan.vice }}</span>
          </h3>
        </div>

        <ul class="list-unstyled fs-5 fw-light text-dark">
          <li
            v-for="descriptionItem in aboutUsInfo.description"
            :key="descriptionItem"
            class="mb-3"
          >
            {{ descriptionItem }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="display-6 mb-10">{{ guideConfig.sectionTitle }}</h3>
        <AccordionList
          :list-id="frontGuide.id"
          :list-title="frontGuide.title"
          :list-arr="frontGuide.guideList"
        />
      </div>

      <AccordionList
        :list-id="passportGuide.id"
        :list-title="passportGuide.title"
        :list-arr="passportGuide.guideList"
      />
    </div>
  </div>
</template>

<script setup>
import { platformInfo, aboutUsInfo, frontGuide, passportGuide } from '@/utils/guideUtils.js'
import AccordionList from '@/components/front/base/AccordionList.vue'

const guideConfig = {
  pageTitle: '使用指南',
  sectionTitle: '如何使用我們的服務'
}
</script>
