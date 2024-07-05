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
    :is-clock-line="roleListTitle.isClock"
    :icon="roleListTitle.icon"
    :title-text="roleListTitle.title"
    :color="roleListTitle.textColor"
    class="mb-10"
  ></IconTitle>
  <p class="text-center text-gray-green">{{ roleListTitle.noteText }}</p>
  <ul class="list-unstyled" :class="[isMediaMdDown ? 'd-flex justify-content-around' : 'row']">
    <li
      v-for="roleItem in roleData"
      :key="roleItem.class"
      :class="[isMediaMdDown ? '' : 'col-12 col-md-4 mb-5 mb-lg-0']"
      @click="getRoleGuide(roleItem.role, roleItem.guide, roleItem.class)"
    >
      <button
        v-if="isMediaMdDown"
        class="btn btn-primary"
        :class="curRole === roleItem.role ? 'btn-success' : 'btn-primary'"
      >
        {{ roleItem.role }}
      </button>
      <div
        v-else
        class="d-flex flex-column align-items-center border rounded border-secondary cursor-pointer p-4 role__card"
        :class="curRole === roleItem.role ? 'role__card--active' : ''"
      >
        <img :src="getImageUrl(roleItem.img)" alt="role-img" class="role__img mb-5" />

        <p class="fs-5 fw-bold m-0">{{ roleItem.role }}</p>
      </div>
    </li>
  </ul>
  <transition name="guide-collapse">
    <div v-if="isOpenGuide" class="border-secondary rounded p-6 d-grid gap-4">
      <h5 class="fs-4 m-0 text-success text-center">{{ curRole }}</h5>
      <div class="p-4">
        <table class="table">
          <tbody>
            <tr class="row" v-for="tableItem in tableTitleData" :key="tableItem.type">
              <th class="col-2 fw-bold">{{ tableItem.text }}</th>
              <td class="col-10">{{ guideData[tableItem.type] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="py-5 ms-auto">
        <RouterLink class="btn btn-primary" :to="searchRole(curDifClass)">
          <div class="d-flex align-items-center">
            <span>{{ roleListTitle.btnViewMore.text }}</span>
            <span class="material-icons ms-3">{{ roleListTitle.btnViewMore.icon }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTrailsListStore } from '@/stores/useTrailsListStore.js'
import { getImageUrl } from '@/utils/imgUrl.js'
import IconTitle from '@/components/front/base/IconTitle.vue'

import { useMediaQuery } from '@vueuse/core'
const isMediaMdDown = useMediaQuery('(max-width: 767px)')

const roleListTitle = {
  isClock: false,
  title: '郊友角色',
  icon: 'hiking',
  textColor: 'dark',
  noteText: '點選角色卡片',
  btnViewMore: {
    text: '瀏覽適合步道',
    icon: 'nature_people '
  }
}

const roleData = [
  {
    role: '輕鬆踏青',
    class: 'junior',
    img: 'assets/illustration/person-light.png',
    guide: {
      target: '一般大眾友善入門',
      road: '坡度較平緩，且設施完善，路面平整易行',
      time: '約半天至1天內',
      equipment: '輕裝（帶水或少許糧食）'
    }
  },
  {
    role: '鍛鍊健行',
    class: 'middle',
    img: 'assets/illustration/person-medium.png',
    guide: {
      target: '體力稍佳、初級登山者',
      road: '部分路段路況較差，坡度較陡，但具基本設施',
      time: '1天內',
      equipment: '應備齊基本生存需求與應急醫療之物資（包括飲水、糧食、地圖、禦寒衣物、急救藥品等）'
    }
  },
  {
    role: '探險挑戰',
    class: 'senior',
    img: 'assets/illustration/person-heavy.png',

    guide: {
      target: '受訓登山者、具野外求生能力者',
      road: '多為土徑，深入原始地區，有許多困難、危險或路況不佳之路段，坡度陡，氣候變化大',
      time: '1天內',
      equipment:
        '登山裝備需俱全（包括糧食、飲水、煮食設備、地圖、禦寒衣物、照明設備、睡袋、帳棚等）如有管制需事先申請許可'
    }
  }
]

const tableTitleData = [
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

const curRole = ref('')
const curDifClass = ref('')
const guideData = ref({})
const isOpenGuide = ref(false)

function getRoleGuide(role, guideInfo, difClass) {
  if (curRole.value && curRole.value === role) {
    guideData.value = {}
    curRole.value = ''
    curDifClass.value = ''
    isOpenGuide.value = false
  } else {
    curRole.value = role
    curDifClass.value = difClass
    guideData.value = guideInfo
    isOpenGuide.value = true
  }
}

const trailsListStore = useTrailsListStore()
const { isTypeToSearch } = storeToRefs(trailsListStore)

function searchRole(role) {
  const queryType = 'trailDifClass'
  let queryValue = []
  if (role === 'junior') {
    queryValue = [0, 1]
  } else if (role === 'middle') {
    queryValue = [2]
  } else if (role === 'senior') {
    queryValue = [3, 4, 5, 6]
  }
  if (queryValue.length !== 0) {
    isTypeToSearch.value = true
    return {
      name: 'TrailsList',
      query: { queryValue, queryType }
    }
  }
}
</script>
@/utils/imgUrl
