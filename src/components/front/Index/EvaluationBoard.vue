<style lang="scss" scoped>
@import '@/styles/main.scss';
.evaluation-board {
  &__wrap {
    background-size: cover;
    background-position: center top;
    min-height: 804px;
  }
  &__container {
    width: 100%;
    padding: 60px 0px;
  }

  &__title {
    background-color: transparent;
    color: $dark;
    @include media-breakpoint-up(lg) {
      background-color: $darken;
      color: $light;
    }
  }

  &__item {
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
    &__container {
      width: 100%;
      height: 100%;
      min-height: 328px;
      @include media-breakpoint-up(lg) {
        max-width: 416px;
      }
    }
  }
  &__avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
<template>
  <div
    class="evaluation-board__wrap"
    :style="{ backgroundImage: `url(${evaluationBoardInfo.bgImg})` }"
  >
    <div class="evaluation-board__container">
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-12 col-lg-4">
            <div
              class="h-100 d-flex flex-column justify-content-center align-items-center evaluation-board__title"
            >
              <IconTitle
                :is-clock-line="evaluationBoardInfo.title.isClock"
                :icon="evaluationBoardInfo.title.icon"
                :title-text="evaluationBoardInfo.title.title"
                :color="titleTextColor"
              ></IconTitle>
              <h4 class="fs-5 fw-medium mb-3">{{ evaluationBoardInfo.subtitle }}</h4>
              <p class="fs-6 m-0">
                {{ evaluationBoardInfo.text.main }}<br />{{ evaluationBoardInfo.text.vice }}
              </p>
            </div>
          </div>
          <div class="col-12 col-lg-8 mt-7 mt-lg-0">
            <ul class="list-unstyled row m-0">
              <li
                class="col-12 col-lg-6 evaluation-board__item"
                v-for="evaluationItem in evaluationData"
                :key="evaluationItem.user"
              >
                <div
                  class="d-flex flex-column justify-content-between evaluation-board__item__container p-5 bg-light"
                >
                  <div>
                    <div class="border-bottom mb-5">
                      <h5 class="fs-5">{{ evaluationItem.trail_data.TR_CNAME }}</h5>
                      <p class="text-warning fs-4">{{ evaluationItem.evaluate }}</p>
                    </div>
                    <div class="d-flex justify-content-between mb-5">
                      <img
                        :src="getImageUrl(evaluationItem.avatar)"
                        alt="avatar"
                        class="evaluation-board__avatar rounded-circle"
                      />
                      <div class="ms-5">
                        <p class="fs-6 fw-bold p-0 mb-3">{{ evaluationItem.user }}</p>
                        <p class="p-0">{{ evaluationItem.mes }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <a href="/" class="fs-6 link-secondary text-decoration-none">
                      <div class="d-flex justify-content-center align-items-center">
                        <span>VIEW ALL</span>
                        <span class="material-icons ms-3"> nature_people </span>
                      </div></a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import IconTitle from '@/components/front/base/IconTitle.vue'

import { getImageUrl } from '@/utils/base'
import bgImg from '@/assets/bg-img/shaba.jpeg'

import { useMediaQuery } from '@vueuse/core'
const isMediaLgUp = useMediaQuery('(min-width: 992px)')

const evaluationBoardInfo = {
  title: {
    isClock: false,
    title: '郊友真情推薦',
    icon: 'landscape',
    textColor: {
      normal: 'dark',
      mediaLgUp: 'light'
    }
  },
  subtitle: '不知如何走出第一步？',
  bgImg,
  text: {
    main: '郊友帶你博覽群山',
    vice: '尋訪與自然的相會'
  }
}

const titleTextColor = computed(() =>
  isMediaLgUp.value
    ? evaluationBoardInfo.title.textColor.mediaLgUp
    : evaluationBoardInfo.title.textColor.normal
)

const evaluationData = [
  {
    user: '賞鳥粉絲',
    avatar: 'assets/avatar/bird.jpeg',
    evaluate: '★★★★☆',
    mes: '沿線植物資源豐富、鳥況極佳，以中低海拔鳥類如五色鳥、藪鳥、山紅頭、冠羽畫眉等為主。',
    trail_data: {
      TR_CNAME: '福山步道',
      TRAILID: '178'
    }
  },
  {
    user: '鐵道迷',
    avatar: 'assets/avatar/train.jpeg',
    evaluate: '★★★★★',
    mes: '全台獨一無二與鐵道相依的登山步道，可從不同的方向三次俯瞰樟腦寮村莊，親自感受獨立山螺旋狀三迴旋之美。',
    trail_data: {
      TR_CNAME: '獨立山步道',
      TRAILID: '085'
    }
  },
  {
    user: '百岳發燒友',
    avatar: 'assets/avatar/hiker.jpeg',
    evaluate: '★★★☆☆',
    mes: '中央山脈主脊南段，為南橫三星中最易攀登者，登頂後為眺望向陽山南面大崩壁最佳觀賞處。',
    trail_data: {
      TR_CNAME: '關山嶺山步道',
      TRAILID: '148'
    }
  },
  {
    user: '賞蝶愛好',
    avatar: 'assets/avatar/butterfly.jpeg',
    evaluate: '★★★☆☆',
    mes: '步道為低海拔天然闊葉林，沿途蜜源植物更吸引許多蝶類、蜜蜂，生物資源豐富。',
    trail_data: {
      TR_CNAME: '鎮南宮步道',
      TRAILID: '174'
    }
  }
]
</script>
