import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/ManualCardEntry.vue')
  },
  {
    path: '/processing',
    component: () => import('@/views/InProgress.vue')
  },
  {
    path: '/success',
    component: () => import('@/views/SuccessPage.vue')
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
