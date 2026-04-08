<template>
  <div class="portal-page">
    <NavBar :routes="navRoutes" />
    <div class="main-content">
      <CommonHeader />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/navBar/NavBar.vue'
import CommonHeader from '@/components/header/CommonHeader.vue'

interface NavRoute {
  path: string
  name?: string | symbol
  meta?: Record<string, unknown>
}

const router = useRouter()

const navRoutes = computed<NavRoute[]>(() => {
  const routes = router.getRoutes()
  const portalRoute = routes.find(r => r.path === '/portal')
  if (!portalRoute?.children) return []

  return portalRoute.children
    .filter(child => child.meta?.label)
    .map(child => ({
      path: `/portal/${child.path}`,
      name: child.name,
      meta: child.meta
    }))
})
</script>

<style scoped lang="scss">
.portal-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  overflow: hidden;
}

.page-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>
