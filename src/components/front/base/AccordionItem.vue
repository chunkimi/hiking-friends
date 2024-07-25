<style lang="scss" scoped>
@import '@/styles/main.scss';

.accordion {
  &__icon {
    transition: transform 0.3s ease;
    &.active {
      transform: rotate(180deg);
    }
  }
}
</style>
<template>
  <div class="border-bottom border-success">
    <div
      class="w-100 px-2 py-3 d-flex justify-content-between align-items-center cursor-pointer"
      :class="isAccordionOpen ? ['bg-success', 'text-light'] : ['text-dark']"
      @click="toggleAccordion"
    >
      <h4 class="fs-6 m-0 p-0">{{ listItem.title }}</h4>
      <span class="material-icons accordion__icon" :class="{ active: isAccordionOpen }">
        expand_more
      </span>
    </div>
    <div v-if="isAccordionOpen" class="border-top p-5">
      <ul class="mb-3">
        <li v-for="(textItem, textIndex) in listItem.text" :key="textIndex" class="py-1">
          {{ textItem }}
        </li>
      </ul>
      <ul class="list-unstyled ps-5">
        <li v-for="imgItem in listItem.imgGroup" :key="imgItem" class="my-2">
          <img
            :src="getAccordionImg(imgItem)"
            :alt="imgItem"
            class="img-fluid rounded mx-auto d-block"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getImageUrl } from '@/utils/imgUrl.js'
defineProps({
  listItem: {
    type: Object,
    required: true
  }
})

const isAccordionOpen = ref(false)
function toggleAccordion() {
  isAccordionOpen.value = !isAccordionOpen.value
}

function getAccordionImg(fileName) {
  const rawUrl = `assets/guide/${fileName}.jpeg`
  return getImageUrl(rawUrl)
}
</script>
