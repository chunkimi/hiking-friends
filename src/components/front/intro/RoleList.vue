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
}

.guide-collapse-enter-active,
.guide-collapse-leave-active {
  transition: opacity 0.5s ease;
}

.guide-collapse-enter-from,
.guide-collapse-leave-to {
  opacity: 0;
}
</style>
<template>
  <TopicTitle
    :title="roleListInfo.title"
    :icon="roleListInfo.icon"
    :circleType="roleListInfo.circleType"
    class="mb-5"
  ></TopicTitle>
  <ul class="list-unstyled" :class="[isMediaMd ? 'd-flex justify-content-around' : 'row']">
    <li
      v-for="roleItem in roleData"
      :key="roleItem.class"
      :class="[isMediaMd ? '' : 'col-12 col-md-4 mb-5 mb-lg-0']"
      @click="getRoleGuide(roleItem.role, roleItem.guide)"
    >
      <button
        v-if="isMediaMd"
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
    <div v-if="isOpenGuide" class="bg-light-gray rounded p-5 d-grid gap-4">
      <h5 class="fs-4 m-0 text-success text-center">{{ curRole }}</h5>
      <div class="p-4">
        <table class="table">
          <tbody>
            <tr class="row">
              <th class="col-2 fw-bold">適合對象</th>
              <td class="col-10">{{ guideData.target }}</td>
            </tr>
            <tr class="row">
              <th class="col-2 fw-bold">路況</th>
              <td class="col-10">{{ guideData.road }}</td>
            </tr>
            <tr class="row">
              <th class="col-2 fw-bold">預估時程</th>
              <td class="col-10">{{ guideData.time }}</td>
            </tr>
            <tr class="row">
              <th class="col-2 fw-bold">攜帶裝備</th>
              <td class="col-10">{{ guideData.equipment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="py-5 ms-auto">
        <button class="btn btn-outline-primary">
          瀏覽適合步道<span class="material-icons ms-3"> nature_people </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { getImageUrl } from '@/utils/base'
import TopicTitle from '@/components/front/base/TopicTitle.vue'

import { useMediaQuery } from '@vueuse/core'
const isMediaMd = useMediaQuery('(max-width: 767px)')

const roleListInfo = {
  title: '郊友角色',
  icon: 'hiking',
  circleType: 'sunshine'
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

const curRole = ref('')
const guideData = ref('')
const isOpenGuide = ref(false)

function getRoleGuide(role, guideInfo) {
  if (curRole.value && curRole.value === role) {
    guideData.value = {}
    curRole.value = ''
    isOpenGuide.value = false
  } else {
    curRole.value = role
    guideData.value = guideInfo
    isOpenGuide.value = true
  }
}
</script>
