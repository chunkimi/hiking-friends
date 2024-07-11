<template>
  <div class="rounded p-4 bg-opacity-75" :class="`bg-${roadCondition.msgColor}`">
    <IconTitle
      :is-clock-line="mainTitle.isClock"
      :icon="mainTitle.icon"
      :title-text="mainTitle.title"
      :color="mainTitle.textColor"
    />
    <p class="fs-5 fw-bold text-light text-center rounded-pill px-1 py-2 my-2">
      {{ roadCondition.TR_TYP }}
    </p>
    <div class="d-flex justify-content-center" v-if="roadCondition.isNoPassing">
      <button
        type="button"
        class="btn btn-sm rounded-circle border-0 d-flex align-items-center"
        :class="`btn-${roadCondition.msgColor}`"
        data-bs-toggle="modal"
        data-bs-target="#roadConditionModal"
      >
        <span class="material-icons p-1 text-light fs-2"> info_outline </span>
      </button>
    </div>
  </div>
  <RoadConditionModal :road-condition="roadCondition"></RoadConditionModal>
</template>
<script setup>
import { computed } from 'vue'
import IconTitle from '@/components/front/base/IconTitle.vue'
import RoadConditionModal from '@/components/front/base/RoadConditionModal.vue'
import { newsType } from '@/utils/trailInfoUtils.js'
import { roadConditionInfo } from '@/utils/trailInfoUtils.js'

const props = defineProps({
  curTrailCondition: {
    type: Object,
    required: true
  }
})

const mainTitle = roadConditionInfo.mainTitle

const roadCondition = computed(() => {
  let isOpenError = props.curTrailCondition.value?.TRAILID ? true : false
  if (!isOpenError) {
    return {
      TR_TYP: '全線開放',
      msgColor: 'success',
      isNoPassing: false
    }
  }

  const msgColor = props.curTrailCondition.value.TR_TYP
    ? newsType.find((type) => type.msg === props.curTrailCondition.value.TR_TYP)?.color
    : null

  return {
    ...props.curTrailCondition.value,
    msgColor,
    isNoPassing: true
  }
})
</script>
