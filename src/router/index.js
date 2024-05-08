import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayoutView from '@/views/FrontLayoutView.vue'
import FrontIndexView from '@/views/front/FrontIndexView.vue'
import TrailsIntroView from '@/views/front/TrailsIntroView.vue'
import TrailsListView from '@/views/front/TrailsListView.vue'
import TrailInfoView from '@/views/front/TrailInfoView.vue'

import LoginView from '@/views/account/LoginView.vue'
import RegisterView from '@/views/account/RegisterView.vue'

import PageNotFoundView from '@/views/front/PageNotFoundView.vue'

import DashboardLayoutView from '@/views/DashboardLayoutView.vue'
import PassportIndexView from '@/views/dashboard/PassportIndexView.vue'

const routes = [
  {
    path: '/',
    component: FrontLayoutView,
    children: [
      {
        path: '',
        name: 'FrontIndex',
        component: FrontIndexView
      },
      {
        //步道主題介紹
        path: 'trails-intro',
        name: 'TrailsIntro',
        component: TrailsIntroView
      },
      {
        //步道總覽與搜尋
        path: 'trails-list',
        name: 'TrailsList',
        component: TrailsListView
      },
      {
        path: 'trail-info/:trail',
        name: 'TrailInfo',
        component: TrailInfoView
      }
    ]
  },
  {
    path: '/account',
    component: FrontLayoutView,
    children: [
      {
        // 使用者登入頁
        path: '',
        name: 'Login',
        component: LoginView
      },
      {
        // 使用者註冊
        path: 'register',
        name: 'Register',
        component: RegisterView
      }
    ]
  },
  {
    // 使用者登山護照介面
    path: '/passport',
    component: DashboardLayoutView,
    children: [
      {
        path: '',
        name: 'PassportIndex',
        component: PassportIndexView
      }
    ]
  },
  {
    path: '/404',
    component: FrontLayoutView,
    children: [
      {
        path: '',
        name: '404',
        component: PageNotFoundView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  }
})

export default router
