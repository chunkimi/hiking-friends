<style lang="scss" scoped>
</style>
<template>
  <div class="h-100">
    <IconTitle
      :is-clock-line="cardTitle.isClock"
      :icon="cardTitle.icon"
      :title-text="cardTitle.title"
      :color="cardTitle.textColor"
    ></IconTitle>
    <div class="mt-3 d-grid gap-3">
      <h6 class="fs-5 text-center text-secondary">{{ cardSubtitle }}</h6>
      <p class="fs-6 text-center text-secondary" v-html="getKeywordHtml(cardKeywordsArr)"></p>
    </div>
  </div>
</template>

<script setup>
import IconTitle from '@/components/front/base/IconTitle.vue'
import { computed } from 'vue'

const props = defineProps({
  cardItem: {
    type: Object,
    required: true
  }
})
const cardTitle = computed(() => props.cardItem.title || {})
const cardSubtitle = computed(() => props.cardItem.subtitle || '')
const cardKeywordsArr = computed(() => props.cardItem.keywords || '')

function getKeywordHtml(data) {
  let result = ''
  data.forEach((item, index) => {
    let raw = `<span class="p-2">${item}</span>`
    if (index % 2 !== 0) {
      raw += '<br />'
    }
    result += raw
  })
  return result
}
</script>