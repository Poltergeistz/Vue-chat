import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
let router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'chat',
        component: () => import('./components/Chat.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('./components/Login.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('./components/Register.vue')
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('./components/ForgotPassword.vue')
      }
    ]
    })

export default router;