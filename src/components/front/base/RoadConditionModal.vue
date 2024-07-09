<style lang="scss" scoped></style>
<template>
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
import { roadConditionInfo } from '@/utils/trailInfoUtils.js'
defineProps({
  roadCondition: {
    type: Object,
    required: true
  }
})
const mainTitle = roadConditionInfo.mainTitle
const itemTitle = roadConditionInfo.itemTitle
</script>
