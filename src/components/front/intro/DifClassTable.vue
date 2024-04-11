<style lang="scss" scoped>
@import '@/styles/main.scss';
.th--min-width {
  min-width: 3rem;
}
</style>
<template>
  <TopicTitle
    :title="difDegreeInfo.title"
    :icon="difDegreeInfo.icon"
    :circleType="difDegreeInfo.circleType"
    class="ps-4"
  ></TopicTitle>
  <div v-if="isMediaMdDown">
    <p class="fw-bold text-center text-danger">因資訊量詳細，請使用電腦瀏覽</p>
  </div>
  <table class="table table-primary mt-5" v-else>
    <thead>
      <tr>
        <th scope="col" class="th--min-width">等級</th>
        <th scope="col">對象</th>
        <th scope="col" class="th--min-width">難易</th>
        <th scope="col">說明</th>
        <th scope="col">區位</th>
        <th scope="col">時程</th>
        <th scope="col">裝備</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="degreeItem in trailDifDegree" :key="degreeItem.class">
        <th scope="row">{{ degreeItem.degree }}</th>
        <td>{{ degreeItem.target }}</td>
        <td>{{ degreeItem.difficult }}</td>
        <td>{{ degreeItem.context }}</td>
        <td>{{ degreeItem.location }}</td>
        <td>{{ degreeItem.time }}</td>
        <td>{{ degreeItem.equipment }}</td>
      </tr>
    </tbody>
  </table>
  <p class="text-secondary text-end">來源：林業與自然保育署</p>
</template>

<script setup>
import TopicTitle from '@/components/front/base/TopicTitle.vue'

import { useMediaQuery } from '@vueuse/core'
const isMediaMdDown = useMediaQuery('(max-width: 767px)')

const difDegreeInfo = {
  title: '步道分級說明',
  icon: 'landscape',
  circleType: 'sunshine'
}
const trailDifDegree = [
  {
    degree: '0',
    difficult: '低',
    context: '步道平整、設施良好、坡度平緩且可供無障礙輔具或嬰幼兒車通行者。',
    location: '坡度平緩地區',
    time: '約半天至一天',
    equipment: '輕裝（帶水或少許糧食）',
    target: '一般大眾'
  },
  {
    degree: '1',
    difficult: '低',
    context: '為交通容易到達之開放性步道，坡度較平緩，且設施完善，路面平整易行。',
    location: '位於遊憩區域、鄰近聚落或海拔約1,000公尺內',
    time: '約半天至一天',
    equipment: '輕裝（帶水或少許糧食）',
    target: '一般大眾'
  },
  {
    degree: 2,
    difficult: '低-中',
    context: '為交通容易到達之開放性步道，坡度較平緩，且設施完善，路面平整易行。',
    location: '位於遊憩區域、鄰近聚落或海拔約1,000-2,000公尺上下',
    time: '一天以內',
    equipment: '輕裝（帶水或少許糧食）',
    target: '體力稍佳者'
  },
  {
    degree: 3,
    difficult: '中',
    context: '偏遠或部分路段需經過應申請之區域。部分路段路況較差，坡度較陡，但具基本設施。',
    location: '較為偏遠區域或海拔約2,000-3,000公尺上下',
    time: '一天；或一至三天，須有過夜準備',
    equipment:
      '需過夜即應有齊全之裝備（包括飲水、食物、地圖、禦寒衣物、急救藥品等），如有管制需事先申請許可',
    target: '初級登山者、體力佳且有初步地圖判讀能力者'
  },
  {
    degree: 4,
    difficult: '中-高',
    context:
      '偏遠或部分路段需經過應申請之區域。位於高海拔（約3,000公尺以上）山區，步道路況較原始，坡度較陡，具部分困難及危險路段，氣候變化大。',
    location: '較為偏遠區域、偏遠荒野或海拔約3,000公尺以上',
    time: '約二至三天，宜有相當經驗者帶領',
    equipment:
      '登山裝備需俱全（包括糧食、飲水、煮食設備、地圖、禦寒衣物、照明設備、睡袋、帳棚等）如有管制需事先申請許可',
    target: '體力佳並具地圖判讀及野外求生能力者'
  },
  {
    degree: 5,
    difficult: '高',
    context:
      '交通不便且多位於應申請之區域。位於高海拔（約3,000公尺以上）山區，步道路況不佳，深入原始地區，有許多困難及危險路段，坡度陡，氣候變化大。',
    location: '較為偏遠區域、偏遠荒野或海拔約3,000公尺以上',
    time: '約三天或以上，宜有專業人員帶領。',
    equipment:
      '登山裝備需俱全（包括糧食、飲水、煮食設備、地圖、禦寒衣物、照明設備、睡袋、帳棚等）如有管制需事先申請許可',
    target: '已受訓登山者'
  },
  {
    degree: 6,
    difficult: '高',
    context:
      '一、積雪（冰）之第三、第四或第五級步道；二、非正式步道，無明確路基或路徑，屬原始山徑、古道遺跡、探勘或技術攀登等特殊路線。',
    location: '偏遠荒野或海拔約3,000公尺以上山區',
    time: '約三天或以上，宜有專業人員帶領。',
    equipment:
      '登山裝備需俱全（包括糧食、飲水、煮食設備、地圖、禦寒衣物、照明設備、睡袋、帳棚等）如有管制需事先申請許可',
    target: '已受訓登山者'
  }
]
</script>
