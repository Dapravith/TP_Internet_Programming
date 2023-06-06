import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginPage
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SignUpSuccess.vue')
    }
  ]
})

export default router
