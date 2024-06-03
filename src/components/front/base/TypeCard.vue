<style lang="scss" scoped></style>
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
      <div class="fs-6 text-center">
        <template v-for="(keyword, index) in cardKeywordsArr" :key="index">
          <RouterLink
            v-if="isKeywordLink"
            :to="searchType(keyword)"
            class="p-2 link-secondary text-decoration-none"
          >
            {{ keyword.title }}
          </RouterLink>
          <span class="p-2 text-secondary" v-else>{{ keyword }}</span>
          <template v-if="(index + 1) % 2 === 0">
            <br />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconTitle from '@/components/front/base/IconTitle.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'

const props = defineProps({
  cardItem: {
    type: Object,
    required: true
  },
  isKeywordLink: {
    type: Boolean,
    required: true
  }
})

const defaultTitle = {
  isClock: false,
  title: '',
  icon: '',
  textColor: ''
}

const cardTitle = computed(() => props.cardItem.title || defaultTitle)
const cardSubtitle = computed(() => props.cardItem.subtitle || '')
const cardKeywordsArr = computed(() => props.cardItem.keywords || [])

const trailsListStore = useTrailsListStore()
const { isTypeToSearch } = storeToRefs(trailsListStore)

function searchType(keyword) {
  const queryValue = keyword.queryValue
  const queryType = keyword.queryType
  isTypeToSearch.value = true
  return {
    name: 'TrailsList',
    query: { queryValue, queryType }
  }
}
</script>
