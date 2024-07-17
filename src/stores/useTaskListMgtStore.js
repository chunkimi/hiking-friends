import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskListMgtStore = defineStore('taskListMgtStore', () => {
  const specifyCurPage = ref(1)
  const curTabModel = ref('all')

  const toggleReloadMgt = ref(false)

  return {
    specifyCurPage,
    curTabModel,
    toggleReloadMgt
  }
})
