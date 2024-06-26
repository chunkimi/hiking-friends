<style lang="scss" scoped>
@import '@/styles/main.scss';

.btn-outline-primary {
  --bs-btn-active-color: #fff;
}
</style>

<template>
  <div class="container">
    <div class="block-spacing">
      <h1 class="h1 text-end">{{ favMgtConfig.pageTitle }}</h1>
      <div>
        <div class="d-flex justify-content-center">
          <div
            class="mx-auto btn-group mb-5"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <template v-for="tabItem in favMgtConfig.tabMenu" :key="tabItem.type">
              <input
                type="radio"
                class="btn-check"
                autocomplete="off"
                :name="tabItem.type"
                :id="tabItem.type"
                :value="tabItem.type"
                v-model="curTabModel"
              />
              <label class="btn btn-outline-primary" :for="tabItem.type">{{ tabItem.title }}</label>
            </template>
          </div>
        </div>
        <div class="">
          <div class="card mb-4 p-3" v-for="favItem in favListData" :key="favItem.favId">
            <div class="d-flex">
              <div
                class="p-1 rounded me-4"
                :class="favItem.hikingState ? 'bg-success' : 'bg-secondary-subtle'"
              ></div>
              <div class="w-100 pb-12">
                <div class="d-flex justify-content-between">
                  <h4 class="h3">{{ favItem.TR_CNAME }}</h4>
                  <div class="d-flex">
                    <button
                      type="button"
                      class="btn btn-sm p-1"
                      v-for="btnItem in favMgtConfig.cardEditConfig"
                      :key="btnItem.type"
                      @click="handleCardBtn(btnItem.type)"
                    >
                      <span class="material-icons fs-6 m-1">
                        {{ btnItem.icon }}
                      </span>
                    </button>
                  </div>
                </div>
                <div class="mt-4">
                  <DotCheckProgressBar :progress-node="progressNode" :fav-item="favItem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { progressNode } from '@/utils/favtrailStateUtils.js'
import DotCheckProgressBar from '@/components/common/DotCheckProgressBar.vue'
import { storeToRefs } from 'pinia'
import { useFavoriteTrailsStore } from '@/stores/useFavoriteTrailsStore'
const favoriteTrailsStore = useFavoriteTrailsStore()
const { favTrailsListData } = storeToRefs(favoriteTrailsStore)

const favListData = ref(favTrailsListData)

const favMgtConfig = {
  pageTitle: '步道任務',
  tabMenu: [
    {
      title: '全部收藏',
      type: 'all'
    },
    {
      title: '尚未攻略',
      type: 'undone'
    },
    {
      title: '完成挑戰',
      type: 'done'
    }
  ],
  cardEditConfig: [
    {
      icon: 'library_books',
      type: 'info'
    },
    {
      icon: 'edit',
      type: 'edit'
    },
    {
      icon: 'delete',
      type: 'delete'
    }
  ]
}

const curTabModel = ref('')
// const favItem = {
//   favId: 'fav20240621001',
//   hikingState: true,
//   isHaveRating: true,
//   isHaveReviews: false,
//   TRAILID: '001',
//   TR_CNAME: '蘇花古道：大南澳越嶺段',
//   TR_LENGTH_NUM: 4.1
// }

function handleCardBtn(type) {
  console.log(type)
}
</script>
