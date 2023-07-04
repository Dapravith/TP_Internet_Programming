import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'
import auth from '../util/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/admin/loginView.vue'),
      beforeEnter:((to,from,next)=>{
        auth(localStorage.getItem("token"))
        .then(res=>{
          return next({
            name:'dashboard'
          })
        })
        .catch(err=>{
          return next()
        })
        
      })
    },
    {
      path: '/cp',
      name: 'dashboard',
      component: () => import('../views/admin/dashboardView.vue'),
      beforeEnter:((to,from,next)=>{
        auth(localStorage.getItem("token"))
        .then(res=>{
          return next()
        })
        .catch(err=>{
          return next({
            name:'login'
          })
        })
        
      })
    }
  ]
})

export default router
