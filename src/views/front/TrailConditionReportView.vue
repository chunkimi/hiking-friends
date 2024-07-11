<style lang="scss" scoped>
@import '@/styles/main.scss';
.table {
  --bs-table-bg: $light-gray;
}
</style>
<template>
  <div class="container container d-grid gap-5">
    <div class="py-15">
      <IconTitle
        :is-clock-line="sectionTitle.isClock"
        :icon="sectionTitle.icon"
        :color="sectionTitle.textColor"
        :title-text="sectionTitle.title"
        class="mb-10"
      ></IconTitle>
      <table
        class="table table-borderless align-middle"
        :class="isMediaLgDown ? '' : 'table-hover'"
      >
        <tbody>
          <tr class="row mb-12 mb-lg-8 fs-6" v-for="newsItem in roadsData" :key="newsItem.TRAILID">
            <td class="col-12 col-lg-2 p-0 pb-3 p-lg-1">
              <p
                class="text-light m-0 rounded-pill text-center px-4 py-1"
                :class="`bg-${newsItem.textColor}`"
              >
                {{ newsItem.TR_TYP }}
              </p>
            </td>
            <td
              class="col-12 col-lg-2 text-center"
              :class="isMediaLgDown ? ['bg-light', 'rounded-pill'] : ''"
            >
              {{ newsItem.TR_CNAME }}
            </td>
            <td class="col-12 col-lg-7 text-secondary">
              {{ newsItem.TITLE }}
            </td>
            <td class="col-12 col-lg-1">
              <button
                @click="getSpecifiedTrail(newsItem.TRAILID)"
                type="button"
                class="btn"
                :class="isMediaLgDown ? ['btn-outline-darken', 'w-100'] : ['btn-darken', 'btn-sm']"
                data-bs-toggle="modal"
                data-bs-target="#roadConditionModal"
              >
                View All
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <RoadConditionModal :road-condition="roadCondition"></RoadConditionModal>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { newsType } from '@/utils/trailInfoUtils.js'
import IconTitle from '@/components/front/base/IconTitle.vue'
import RoadConditionModal from '@/components/front/base/RoadConditionModal.vue'

const isMediaLgDown = useMediaQuery('(max-width: 992px)')

const sectionTitle = {
  isClock: false,
  title: '路況即時報',
  icon: 'campaign',
  textColor: 'dark'
}

const trailsListStore = useTrailsListStore()
const { allTrailsCondition } = storeToRefs(trailsListStore)

const roadsData = computed(() => {
  const filterAllTailsNews = allTrailsCondition.value.filter((roadItem) => {
    let raw = newsType.find((typeItem) => typeItem.msg === roadItem['TR_TYP'])
    return raw !== undefined
  })
  return filterAllTailsNews.map((roadItem) => {
    let raw = newsType.find((typeItem) => typeItem.msg === roadItem['TR_TYP'])

    roadItem.textColor = raw.color
    return roadItem
  })
})

const roadCondition = ref({})

function getSpecifiedTrail(specifiedId) {
  const matchingTrail = allTrailsCondition.value.find((trail) => trail.TRAILID === specifiedId)
  const msgColor = matchingTrail.TR_TYP
    ? newsType.find((type) => type.msg === matchingTrail.TR_TYP)?.color
    : null

  roadCondition.value = {
    ...matchingTrail,
    msgColor,
    isNoPassing: true
  }
}
</script>
