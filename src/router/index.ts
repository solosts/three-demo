import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gettingStarted',
      component: () => import('../views/gettingStarted/one.vue')
    },
  ]
})

export default router
