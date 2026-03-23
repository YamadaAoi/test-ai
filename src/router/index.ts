/**
 * 路由配置
 * 所有页面组件需要按需导入！！！例如：component: () => import('../views/login/LoginPage.vue')
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginPage.vue')
    }
  ]
})

export default router
