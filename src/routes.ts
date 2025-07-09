import { createMemoryHistory, createRouter } from 'vue-router'

import ManualCardEntry from '@/views/ManualCardEntry.vue'
import InProgress from '@/views/InProgress.vue'
import SuccessPage from '@/views/SuccessPage.vue'

const routes = [
  // For now
  { path: '/', component: ManualCardEntry },
  { path: '/processing', component: InProgress },
  { path: '/success', component: SuccessPage },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
