<style lang="scss" scoped></style>
<template>
  <div>
    <h3 class="h3 mb-5 text-end text-dark">{{ sectionTitle }}</h3>
    <div class="card shadow-sm w-100">
      <div class="card-header bg-transparent">
        <div class="input-group">
          <select class="form-select" v-model="selectedFilter">
            <option value="" disabled>請選擇篩選條件</option>
            <option v-for="option in filterOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-sm table-hover align-middle mb-0">
            <thead class="">
              <tr>
                <th scope="col"></th>
                <th scope="col" v-for="tableItem in tableConfig" :key="tableItem.type">
                  {{ tableItem.title }}
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="text-wrap">
              <tr
                class="cursor-pointer"
                v-for="(rowItem, index) in curTableData"
                :key="rowItem.favId"
                @click="readTrailTask(rowItem.favId)"
              >
                <th scope="row" class="text-dark">{{ index + 1 }}</th>
                <td v-for="tableItem in tableConfig" :key="tableItem.type">
                  <span
                    class="material-icons"
                    v-if="typeof rowItem[tableItem.type] === 'boolean'"
                    :class="rowItem[tableItem.type] ? 'text-success' : 'text-danger'"
                    >{{ rowItem[tableItem.type] ? 'task_alt' : 'crop_square' }}</span
                  >
                  <span v-else class="text-dark">{{ rowItem[tableItem.type] }}</span>
                </td>
                <td>
                  <span class="material-icons text-dark"> info </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end bg-transparent">
        <PaginationNav
          :current-page="curPage"
          :number-of-pages="numberOfPages"
          @changePage="changePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PaginationNav from '@/components/common/PaginationNav.vue'

const props = defineProps({
  allTrailsData: {
    type: Array,
    required: true
  },
  favTrailsData: {
    type: Array,
    required: true
  }
})

const sectionTitle = '收藏步道概覽'

const tableConfig = [
  {
    title: '步道名稱',
    type: 'TR_CNAME'
  },
  {
    title: '狀態',
    type: 'state'
  },
  {
    title: '心得',
    type: 'isHaveRating'
  },
  {
    title: '評論',
    type: 'isHaveReviews'
  }
]

const filterOptions = [
  { value: '', text: '所有步道' },
  { value: 'completed_true', text: '步道完成狀態 - 已完成' },
  { value: 'completed_false', text: '步道完成狀態 - 未完成' },
  { value: 'rating_true', text: '評分狀態 - 已評分' },
  { value: 'rating_false', text: '評分狀態 - 未評分' },
  { value: 'reviews_true', text: '評論狀態 - 有評論' },
  { value: 'reviews_false', text: '評論狀態 - 無評論' }
]

const favListData = computed(() => {
  let result = []
  props.allTrailsData.forEach((allTrail) => {
    props.favTrailsData.forEach((favTrail) => {
      if (allTrail.TRAILID === favTrail.content.TRAILID) {
        let favId = favTrail.id
        let state =
          favTrail.completed_at !== null && favTrail.completed_at !== undefined ? true : false
        let TRAILID = allTrail.TRAILID
        let TR_CNAME = allTrail.TR_CNAME
        let isHaveRating = favTrail?.content?.rating !== undefined ? true : false
        let isHaveReviews = favTrail?.content?.reviews !== undefined ? true : false
        let rawResult = {
          favId,
          TRAILID,
          TR_CNAME,
          state,
          isHaveRating,
          isHaveReviews
        }
        result.push(rawResult)
      }
    })
  })
  return result
})

const selectedFilter = ref('')
const tableData = computed(() => {
  if (selectedFilter.value === '') {
    return favListData.value
  }
  let filterKey, filterValue
  switch (selectedFilter.value) {
    case 'completed_true':
      filterKey = 'state'
      filterValue = true
      break
    case 'completed_false':
      filterKey = 'state'
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
  return favListData.value.filter((item) => item[filterKey] === filterValue)
})

const curTableData = ref([])
const perPageTrails = 10
const curPage = ref(1)
const tableDataNum = computed(() => {
  return tableData.value.length
})
const numberOfPages = computed(() => Math.ceil(tableDataNum.value / perPageTrails))

function changePage(page) {
  if (page >= 1 && page <= numberOfPages.value) {
    curPage.value = page
    curTableData.value = getDataByPage(page)
  }
}
function getDataByPage(pageNum) {
  const startIndex = (pageNum - 1) * perPageTrails
  return tableData.value.slice(startIndex, startIndex + perPageTrails)
}

function tableDataInit() {
  curPage.value = 1
  curTableData.value = getDataByPage(curPage.value)
}

const router = useRouter()
function readTrailTask(taskId) {
  console.log('readTrailTask', taskId)
  router.push({ name: 'TrailTask', params: { task: taskId } })
}

watch([selectedFilter, tableData], () => {
  tableDataInit()
})

onMounted(() => {
  tableDataInit()
})
</script>
