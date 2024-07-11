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
          <span
            v-if="isKeywordLink"
            @click="searchTypeToList(keyword)"
            class="p-2 text-secondary cursor-pointer"
          >
            {{ keyword.title }}
          </span>
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import IconTitle from '@/components/front/base/IconTitle.vue'

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
const { isSearchByOutside, searchKeyword, searchType } = storeToRefs(trailsListStore)

const router = useRouter()
function searchTypeToList(keyword) {
  searchKeyword.value = keyword.queryValue
  searchType.value = keyword.queryType
  isSearchByOutside.value = true
  router.push({ name: 'TrailsList' })
}
</script>
