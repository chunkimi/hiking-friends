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
  <!-- Modal -->
  <div
    class="modal fade"
    id="roadConditionModal"
    tabindex="-1"
    aria-labelledby="roadConditionModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="roadConditionModalLabel">
            {{ `${roadCondition.TR_CNAME}${mainTitle.title}` }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="py-3">
            <h5 class="h4 text-center mb-5">{{ roadCondition.TR_CNAME }}</h5>
            <h6
              :class="`bg-${roadCondition.msgColor}`"
              class="text-center h5 text-light px-1 py-2 rounded-pill"
            >
              {{ roadCondition.TR_TYP }}
            </h6>
          </div>

          <ul class="list-unstyled p-3">
            <li class="row p-2 mb-1 border-bottom" v-for="msgItem in itemTitle" :key="msgItem.type">
              <p class="col-12 col-md-3 fw-bold p-0 m-0">{{ msgItem.name }}</p>
              <p class="col-12 col-md-9 p-0 m-0">{{ roadCondition[msgItem.type] }}</p>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary d-flex align-items-center"
            data-bs-dismiss="modal"
          >
            <span class="material-icons"> close </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import IconTitle from '@/components/front/base/IconTitle.vue'

const props = defineProps({
  trailId: {
    type: String,
    required: true
  },
  title: {
    type: Object,
    required: true
  },
  allTrailsNews: {
    type: Array,
    required: true
  }
})

const mainTitle = computed(() => props.title.mainTitle)
const itemTitle = computed(() => props.title.itemTitle)

const newsType = [
  {
    msg: '注意',
    color: 'warning'
  },
  {
    msg: '部分封閉',
    color: 'secondary'
  },
  {
    msg: '暫停開放',
    color: 'danger'
  }
]

const roadCondition = computed(() => {
  const matchingTrail = props.allTrailsNews.find((trail) => trail.TRAILID === props.trailId)

  if (!matchingTrail) {
    return {
      TR_TYP: '全線開放',
      msgColor: 'success',
      isNoPassing: false
    }
  }

  const msgColor = matchingTrail.TR_TYP
    ? newsType.find((type) => type.msg === matchingTrail.TR_TYP)?.color
    : null

  return {
    ...matchingTrail,
    msgColor,
    isNoPassing: true
  }
})
</script>
