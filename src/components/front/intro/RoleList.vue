<style lang="scss" scoped>
@import '@/styles/main.scss';
.role {
  &__card {
    &--active,
    &:hover {
      background-color: $primary;
      color: $light;
      opacity: 0.7;
    }
  }
  &__img {
    max-width: 300px;
  }
  &__board {
    background-color: $gray-green;
    opacity: 0.5;
  }
}

.guide-collapse-enter-active,
.guide-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.guide-collapse-enter-from,
.guide-collapse-leave-to {
  opacity: 0;
}
.table {
  --bs-table-bg: $light-gray;
  border-color: $secondary;
}
</style>
<template>
  <IconTitle
    :is-clock-line="roleListConfig.isClock"
    :icon="roleListConfig.icon"
    :title-text="roleListConfig.title"
    :color="roleListConfig.textColor"
    class="mb-10"
  ></IconTitle>
  <p class="text-center text-gray-green">{{ roleListConfig.noteText }}</p>
  <ul class="list-unstyled" :class="[isMediaMdDown ? 'd-flex justify-content-around' : 'row']">
    <li
      v-for="roleItem in hikerRole"
      :key="roleItem.role"
      :class="[isMediaMdDown ? '' : 'col-12 col-md-4 mb-5 mb-lg-0']"
      @click="getRoleGuide(roleItem.title, roleItem.guide, roleItem.role)"
    >
      <button
        v-if="isMediaMdDown"
        class="btn btn-primary"
        :class="cutTitle === roleItem.title ? 'btn-success' : 'btn-primary'"
      >
        {{ roleItem.title }}
      </button>
      <div
        v-else
        class="d-flex flex-column align-items-center border rounded border-secondary cursor-pointer p-4 role__card"
        :class="cutTitle === roleItem.title ? 'role__card--active' : ''"
      >
        <img :src="getImageUrl(roleItem.img)" alt="role-img" class="role__img mb-5" />

        <p class="fs-5 fw-bold m-0">{{ roleItem.title }}</p>
      </div>
    </li>
  </ul>
  <transition name="guide-collapse">
    <div v-if="isOpenGuide" class="border-secondary rounded p-6 d-grid gap-4">
      <h5 class="fs-4 m-0 text-success text-center">{{ cutTitle }}</h5>
      <div class="p-4">
        <table class="table">
          <tbody>
            <tr class="row" v-for="tableItem in roleListConfig.tableTitle" :key="tableItem.type">
              <th class="col-2 fw-bold">{{ tableItem.text }}</th>
              <td class="col-10">{{ guideData[tableItem.type] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="py-5 ms-auto">
        <button class="btn btn-primary" @click="searchRoleToList(curRole)">
          <div class="d-flex align-items-center">
            <span>{{ roleListConfig.btnViewMore.text }}</span>
            <span class="material-icons ms-3">{{ roleListConfig.btnViewMore.icon }}</span>
          </div>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { getImageUrl } from '@/utils/imgUrl.js'
import { hikerRole } from '@/data/HikerRole.js'
import { useMediaQuery } from '@vueuse/core'
import IconTitle from '@/components/front/base/IconTitle.vue'

const isMediaMdDown = useMediaQuery('(max-width: 767px)')

const roleListConfig = {
  isClock: false,
  title: '郊友角色',
  icon: 'hiking',
  textColor: 'dark',
  noteText: '點選角色卡片',
  btnViewMore: {
    text: '瀏覽適合步道',
    icon: 'nature_people '
  },
  tableTitle: [
    {
      text: '適合對象',
      type: 'target'
    },
    {
      text: '路況',
      type: 'road'
    },
    {
      text: '預估時程',
      type: 'time'
    },
    {
      text: '攜帶裝備',
      type: 'equipment'
    }
  ]
}

const cutTitle = ref('')
const curRole = ref('')
const guideData = ref({})
const isOpenGuide = ref(false)

function getRoleGuide(title, guideInfo, role) {
  if (cutTitle.value && cutTitle.value === title) {
    guideData.value = {}
    cutTitle.value = ''
    curRole.value = ''
    isOpenGuide.value = false
  } else {
    cutTitle.value = title
    curRole.value = role
    guideData.value = guideInfo
    isOpenGuide.value = true
  }
}

const trailsListStore = useTrailsListStore()
const { isSearchByOutside, searchKeyword, searchType } = storeToRefs(trailsListStore)

const router = useRouter()

function searchRoleToList(role) {
  searchType.value = 'dif'
  let rawKeyword = []
  switch (role) {
    case 'junior':
      rawKeyword = ['0', '1']
      break
    case 'middle':
      rawKeyword = ['2']
      break
    case 'senior':
      rawKeyword = ['3', '4', '5', '6']
      break
    default:
      rawKeyword = []
      break
  }
  searchKeyword.value = rawKeyword
  searchType.value = 'dif'
  isSearchByOutside.value = true
  router.push({ name: 'TrailsList' })
}
</script>
