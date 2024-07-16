<template>
  <div>
    <h3 class="h3 mb-5 text-end text-dark">{{ listOverviewConfig.sectionTitle }}</h3>
    <div class="card shadow-sm w-100">
      <div class="card-header bg-transparent">
        <div class="input-group">
          <select class="form-select" v-model="selectedFilter">
            <option value="" disabled>請選擇篩選條件</option>
            <option
              v-for="option in listOverviewConfig.filterOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-sm table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col"></th>
                <th
                  scope="col"
                  v-for="tableItem in listOverviewConfig.tableConfig"
                  :key="tableItem.type"
                >
                  {{ tableItem.title }}
                </th>
              </tr>
            </thead>
            <tbody class="text-wrap">
              <tr
                class="cursor-pointer"
                v-for="(rowItem, index) in curListData"
                :key="rowItem.favId"
                @click="readTrailTask(rowItem.favId)"
              >
                <th scope="row" class="text-dark">{{ index + 1 }}</th>
                <td v-for="tableItem in listOverviewConfig.tableConfig" :key="tableItem.type">
                  <span
                    class="material-icons"
                    v-if="typeof rowItem[tableItem.type] === 'boolean'"
                    :class="rowItem[tableItem.type] ? 'text-success' : 'text-danger'"
                    >{{ convertBooleanToIcon(rowItem[tableItem.type]) }}</span
                  >
                  <span v-else class="text-dark">{{ rowItem[tableItem.type] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end bg-transparent">
        <!-- <PaginationNav
          :current-page="curPage"
          :number-of-pages="numberOfPages"
          @changePage="changePage"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePaginationUtils } from '@/utils/paginationUtils.js'
import { convertBooleanToIcon } from '@/utils/favTrailStateUtils.js'
// import PaginationNav from '@/components/common/PaginationNav.vue'

const props = defineProps({
  taskListData: {
    type: Array,
    required: true
  }
})

const listOverviewConfig = {
  sectionTitle: '收藏步道概覽',
  tableConfig: [
    {
      title: '步道名稱',
      type: 'TR_CNAME'
    },
    {
      title: '完走',
      type: 'hikingState'
    },
    {
      title: '評分',
      type: 'isHaveRating'
    },
    {
      title: '評論',
      type: 'isHaveReviews'
    }
  ],
  filterOptions: [
    { value: '', text: '所有步道' },
    { value: 'completed_true', text: '步道完成狀態 - 已完成' },
    { value: 'completed_false', text: '步道完成狀態 - 未完成' },
    { value: 'rating_true', text: '評分狀態 - 已評分' },
    { value: 'rating_false', text: '評分狀態 - 未評分' },
    { value: 'reviews_true', text: '評論狀態 - 有評論' },
    { value: 'reviews_false', text: '評論狀態 - 無評論' }
  ]
}

const selectedFilter = ref('')
const tableData = computed(() => {
  if (selectedFilter.value === '') {
    return props.taskListData
  }
  let filterKey, filterValue
  switch (selectedFilter.value) {
    case 'completed_true':
      filterKey = 'hikingState'
      filterValue = true
      break
    case 'completed_false':
      filterKey = 'hikingState'
      filterValue = false
      break
    case 'rating_true':
      filterKey = 'isHaveRating'
      filterValue = true
      break
    case 'rating_false':
      filterKey = 'isHaveRating'
      filterValue = false
      break
    case 'reviews_true':
      filterKey = 'isHaveReviews'
      filterValue = true
      break
    case 'reviews_false':
      filterKey = 'isHaveReviews'
      filterValue = false
      break
  }
  return props.taskListData.filter((item) => item[filterKey] === filterValue)
})

// const perPageTrails = 10
// const { curPage, numberOfPages, curListData, changePage, pageInit } = usePaginationUtils(
//   tableData,
//   perPageTrails
// )

const router = useRouter()
function readTrailTask(taskId) {
  router.push({ name: 'TrailTask', params: { task: taskId } })
}

// watch([selectedFilter, tableData], () => {
//   pageInit()
// })

// onMounted(() => {
//   pageInit()
// })
</script>
