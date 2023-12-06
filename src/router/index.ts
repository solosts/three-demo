import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gettingStarted',
      component: () => import('../views/gettingStarted/one.vue')
    },
    {
      path: '/array',
      name: 'array',
      component: () => import('../views/gettingStarted/array.vue')
    },
    {
      path: '/gui',
      name: 'gui',
      component: () => import('../views/gettingStarted/gui.vue')
    },
  ]
})

export default router
