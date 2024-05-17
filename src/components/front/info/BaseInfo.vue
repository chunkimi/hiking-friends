<style lang="scss" scoped></style>

<template>
  <IconTitle
    :is-clock-line="mainTitle.isClock"
    :icon="mainTitle.icon"
    :title-text="mainTitle.title"
    :color="mainTitle.textColor"
    class="mb-10"
  />
  <ul class="list-unstyled row px-4">
    <li
      class="col-12 col-lg-9 mx-auto p-4 mb-2 border-bottom border-secondary"
      v-for="itemInfo in itemTitle"
      :key="itemInfo.type"
    >
      <div class="row">
        <div class="col-5 col-md-3 col-lg-2">
          <h6 class="h6 m-0 px-2 lh-base">{{ itemInfo.name }}</h6>
        </div>
        <div class="col-7 col-md-9 col-lg-10">
          <p class="m-0">{{ isNoneValue(trailInfo[itemInfo.type]) }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { computed } from 'vue'
import IconTitle from '@/components/front/base/IconTitle.vue'
const props = defineProps({
  trailInfo: {
    type: Object,
    required: true
  },
  title: {
    type: Object,
    required: true
  }
})

const mainTitle = computed(() => props.title.mainTitle)
const itemTitle = computed(() => props.title.itemTitle)

function isNoneValue(infoData) {
  if (infoData) {
    return infoData
  }
  return '尚無官方資訊'
}
</script>
