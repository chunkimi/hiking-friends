<style lang="scss" scoped>
@import '@/styles/main.scss';

.areaItem {
  margin-bottom: 28px;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  @include media-breakpoint-up(lg) {
    &:nth-last-child(2),
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-2">
        <div class="h-100">
          <TopicTitle
            :title="areaListInfo.title"
            :icon="areaListInfo.icon"
            :circleType="areaListInfo.circleType"
          ></TopicTitle>
        </div>
      </div>
      <div class="col-12 col-lg-10 mt-5 mt-lg-0">
        <ul class="list-unstyled row m-0">
          <li
            v-for="areaItem in cityArea"
            :key="areaItem.area"
            class="col-12 col-lg-6 h-100 areaItem"
          >
            <div class="border rounded bg-light p-5 h-100">
              <h5 class="h5 text-center mb-5">{{ areaItem.area }}</h5>
              <p class="text-secondary fs-6" v-html="getCityListHtml(areaItem.city)"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopicTitle from '@/components/front/base/TopicTitle.vue'

const areaListInfo = {
  title: '探索地區',
  icon: 'map',
  circleType: 'sunshine'
}
const cityArea = [
  {
    area: '北部地區',
    city: ['台北市', '新北市', '基隆市', '宜蘭縣', '桃園市', '新竹縣', '新竹市']
  },
  {
    area: '南部地區',
    city: ['高雄市', '台南市', '嘉義市', '嘉義縣', '屏東縣']
  },
  {
    area: '中部地區',
    city: ['台中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣']
  },
  {
    area: '東部地區',
    city: ['花蓮縣', '台東縣']
  }
]

function getCityListHtml(data) {
  let result = ''
  data.forEach((item) => {
    let raw = `<a class="p-2 link-darken text-decoration-none">${item}</a>`

    result += raw
  })
  return result
}
</script>
