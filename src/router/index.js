import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayoutView from '@/views/FrontLayoutView.vue'
import HomeView from '@/views/front/HomeView.vue'

const routes = [
  {
    path: '/',
    component: FrontLayoutView,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
