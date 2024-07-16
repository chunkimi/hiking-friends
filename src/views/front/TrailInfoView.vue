<style lang="scss" scoped>
@import '@/styles/main.scss';

.extendedTrailInfo-collapse-enter-active,
.extendedTrailInfo-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.extendedTrailInfo-collapse-enter-from,
.extendedTrailInfo-collapse-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="container">
    <GoBackIcon />
    <div class="block-spacing">
      <PurposeTitle :trail-info="curTrailData" />
      <div class="row flex-lg-row-reverse">
        <div class="col-12 col-lg-8 offset-lg-1 mb-15 mb-lg-0">
          <div class="h-100 d-flex align-items-center py-8 px-4 py-lg-0">
            <p class="fs-5 fst-italic fw-lighter lh-lg">{{ curTrailData.GUIDE_CONTENT }}</p>
          </div>
        </div>
        <div class="col-12 col-sm-6 mx-auto mx-lg-0 col-lg-3 align-self-lg-center">
          <TrailOpenStatus :cur-trail-condition="curTrailCondition" />
        </div>
      </div>
      <div>
        <BasicInfo :title="baseTrailInfo" :trail-info="curTrailData" />
        <div class="d-flex justify-content-center pt-15">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary d-flex align-items-center"
            @click="toggleExtendedCollapse"
          >
            <span class="material-icons" v-if="isOpenExtendedTrailInfo">expand_less</span>
            <span class="material-icons" v-else> expand_more </span>
          </button>
        </div>
      </div>
      <transition name="extendedTrailInfo-collapse">
        <div class="py-15" v-if="isOpenExtendedTrailInfo">
          <BasicInfo :title="extendedTrailInfo" :trail-info="curTrailData" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { baseTrailInfo, extendedTrailInfo } from '@/utils/trailInfoUtils.js'
import GoBackIcon from '@/components/common/GoBackIcon.vue'
import PurposeTitle from '@/components/front/info/PurposeTitle.vue'
import BasicInfo from '@/components/front/info/BasicInfo.vue'
import TrailOpenStatus from '@/components/front/info/TrailOpenStatus.vue'

const trailsListStore = useTrailsListStore()
const { allTrailsData, allTrailsCondition } = storeToRefs(trailsListStore)

const route = useRoute()
const curTrailId = route.params.trail
const curTrailData = ref({})
const curTrailCondition = ref({})

onBeforeMount(() => {
  curTrailData.value = allTrailsData.value.find((item) => item.TRAILID === curTrailId) || {}
  curTrailCondition.value =
    allTrailsCondition.value.find((trail) => trail.TRAILID === curTrailId) || {}
})

const isOpenExtendedTrailInfo = ref(false)
function toggleExtendedCollapse() {
  return (isOpenExtendedTrailInfo.value = !isOpenExtendedTrailInfo.value)
}
</script>
