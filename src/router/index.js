import { createRouter, createWebHashHistory } from 'vue-router'

import FrontLayoutView from '@/views/FrontLayoutView.vue'
import FrontIndexView from '@/views/front/FrontIndexView.vue'
import TrailsIntroView from '@/views/front/TrailsIntroView.vue'
import TrailsListView from '@/views/front/TrailsListView.vue'
import TrailInfoView from '@/views/front/TrailInfoView.vue'
import TrailConditionReportView from '@/views/front/TrailConditionReportView.vue'

import LoginView from '@/views/account/LoginView.vue'
import RegisterView from '@/views/account/RegisterView.vue'

import DashboardLayoutView from '@/views/DashboardLayoutView.vue'
import PassportIndexView from '@/views/dashboard/PassportIndexView.vue'
import PerAnalysisView from '@/views/dashboard/PerAnalysisView.vue'
import TaskListMgtView from '@/views/dashboard/TaskListMgtView.vue'
import TrailTaskView from '@/views/dashboard/TrailTaskView.vue'

import PageNotFoundView from '@/views/PageNotFoundView.vue'

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
        path: 'trails-intro',
        name: 'TrailsIntro',
        component: TrailsIntroView
      },
      {
        path: 'trails-list',
        name: 'TrailsList',
        component: TrailsListView
      },
      {
        path: 'trail-info/:trail',
        name: 'TrailInfo',
        component: TrailInfoView
      },
      {
        path: 'trail-condition-report',
        name: 'TrailConditionReport',
        component: TrailConditionReportView
      }
    ]
  },
  {
    path: '/account',
    component: FrontLayoutView,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView
      }
    ]
  },
  {
    path: '/passport',
    component: DashboardLayoutView,
    children: [
      {
        path: '',
        name: 'PassportIndex',
        component: PassportIndexView
      },
      {
        path: 'per-analysis',
        name: 'PerAnalysis',
        component: PerAnalysisView
      },
      {
        path: 'task-list',
        name: 'TaskListMgt',
        component: TaskListMgtView
      },
      {
        path: 'trail-task/:task',
        name: 'TrailTask',
        component: TrailTaskView
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
