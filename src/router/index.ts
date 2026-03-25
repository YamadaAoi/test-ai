/**
 * 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'

import iconDevice from '@/assets/components/navBar/icon_设备管理_选中.png'
import iconUser from '@/assets/components/navBar/icon_用户管理.png'
import iconAudit from '@/assets/components/navBar/icon_审计管理.png'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/portal/device'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/portal',
      name: 'Portal',
      component: () => import('@/views/portal/PortalPage.vue'),
      children: [
        {
          path: 'device',
          name: 'Device',
          meta: {
            label: '设备管理',
            icon: iconDevice
          },
          component: () => import('@/views/device/DeviceStatus.vue')
        },
        {
          path: 'user',
          name: 'User',
          meta: {
            label: '用户管理',
            icon: iconUser
          },
          component: () => import('@/views/user/UserManage.vue')
        },
        {
          path: 'audit',
          name: 'Audit',
          meta: {
            label: '审计管理',
            icon: iconAudit
          },
          component: () => import('@/views/audit/AuditManage.vue')
        }
      ]
    }
  ]
})

export default router
