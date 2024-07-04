<style lang="scss" scoped>
@import '@/styles/main.scss';

.task {
  background-color: $gray-300;
  &--completed {
    background-color: $info;
  }
  &--all-completed {
    background-color: $success;
  }
}
</style>

<template>
  <div class="card p-3">
    <div class="d-flex">
      <div class="p-1 rounded me-4 task" :class="`task--${taskState}`"></div>
      <div class="w-100 pb-12">
        <div class="d-flex justify-content-between">
          <h4 class="h3">{{ taskItem.TR_CNAME }}</h4>
          <div class="d-flex">
            <button
              type="button"
              class="btn btn-sm p-1"
              v-for="btnItem in cardEditConfig"
              :key="btnItem.type"
              @click="handleCardBtn(btnItem.type)"
            >
              <span class="material-icons fs-6 m-1">
                {{ btnItem.icon }}
              </span>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <DotCheckProgressBar :progress-node="progressNode" :task-item="taskItem" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { progressNode } from '@/utils/favTrailStateUtils.js'
import DotCheckProgressBar from '@/components/common/DotCheckProgressBar.vue'

const props = defineProps({
  taskItem: {
    type: Object,
    required: true
  }
})

const cardEditConfig = [
  {
    icon: 'edit',
    type: 'edit'
  },
  {
    icon: 'delete',
    type: 'delete'
  }
]

const taskState = computed(() => {
  const progressNodeTypes = progressNode.map((node) => node.type)
  if (progressNodeTypes.every((type) => props.taskItem[type])) {
    return 'all-completed'
  } else if (props.taskItem.hikingState) {
    return 'completed'
  } else {
    return ''
  }
})

const router = useRouter()

function handleCardBtn(type) {
  switch (type) {
    case 'edit':
      router.push({ name: 'TrailTask', params: { task: props.taskItem.favId } })
      break
    case 'delete':
      console.log('删除taskItem', props.taskItem.favId)
      break
  }
}
</script>
