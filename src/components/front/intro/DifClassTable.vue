<style lang="scss" scoped>
@import '@/styles/main.scss';
.th--min-width {
  min-width: 3rem;
}
.table {
  --bs-table-bg: $light-gray;
  border-color: $secondary;
}
</style>
<template>
  <div>
    <IconTitle
      :is-clock-line="difDegreeConfig.isClock"
      :icon="difDegreeConfig.icon"
      :title-text="difDegreeConfig.title"
      :color="difDegreeConfig.textColor"
      class="icon-title-spacing"
    ></IconTitle>
    <div v-if="isMediaMdDown">
      <p class="fw-bold text-center text-danger">{{ difDegreeConfig.isMediaMdDownMsg }}</p>
    </div>
    <table class="table table-hover" v-else>
      <thead>
        <tr class="align-middle">
          <th
            scope="col"
            :class="
              tableItem.type === 'degree' || tableItem.type === 'difficult' ? 'th--min-width' : ''
            "
            v-for="tableItem in difDegreeConfig.tableTitle"
            :key="tableItem.type"
          >
            {{ tableItem.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in trailDifClassArr" :key="row.degree" class="align-middle">
          <td v-for="tableItem in difDegreeConfig.tableTitle" :key="tableItem.type" class="py-6">
            {{ row[tableItem.type] }}
          </td>
          <td>
            <span
              class="material-icons p-2 text-secondary cursor-pointer"
              @click="searchDifClassToList(row.degree)"
            >
              exit_to_app
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-secondary text-end">{{ difDegreeConfig.source }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { useMediaQuery } from '@vueuse/core'
import { trailDifClassArr } from '@/data/front/trailDifClass.js'
import IconTitle from '@/components/front/base/IconTitle.vue'

const isMediaMdDown = useMediaQuery('(max-width: 767px)')

const difDegreeConfig = {
  isClock: false,
  title: '步道分級',
  icon: 'landscape',
  textColor: 'dark',
  isMediaMdDownMsg: '因資訊量詳細，請使用電腦瀏覽',
  source: '來源：林業與自然保育署',
  tableTitle: [
    {
      text: '等級',
      type: 'degree'
    },
    {
      text: '對象',
      type: 'target'
    },
    {
      text: '難易',
      type: 'difficult'
    },
    {
      text: '說明',
      type: 'context'
    },
    {
      text: '區位',
      type: 'location'
    },
    {
      text: '時程',
      type: 'time'
    },
    {
      text: '裝備',
      type: 'equipment'
    }
  ]
}

const trailsListStore = useTrailsListStore()
const { isSearchByOutside, searchKeyword, searchType } = storeToRefs(trailsListStore)

const router = useRouter()
function searchDifClassToList(difClassValue) {
  searchKeyword.value = [difClassValue.toString()]
  searchType.value = 'dif'
  isSearchByOutside.value = true
  router.push({ name: 'TrailsList' })
}
</script>
@/data/front/trailDifClass.js
