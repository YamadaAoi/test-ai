<template>
  <nav class="nav-bar">
    <div class="nav-header">
      <div class="logo"></div>
      <div class="collapse-btn" @click="toggleCollapse"></div>
    </div>
    <div class="nav-menu">
      <div
        v-for="route in routes"
        :key="route.path"
        class="nav-item"
        :class="{ active: isActive(route.path) }"
        @click="navigateTo(route.path)"
      >
        <div class="nav-icon" :style="getIconStyle(route.meta?.icon)"></div>
        <span class="nav-label">{{ route.meta?.label }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

interface NavRoute {
  path: string
  name?: string | symbol
  meta?: Record<string, unknown>
}

defineProps<{
  routes: NavRoute[]
}>()

const router = useRouter()
const currentRoute = useRoute()

const isActive = (path: string) => {
  return currentRoute.path === path || currentRoute.path.startsWith(path + '/')
}

const navigateTo = (path: string) => {
  router.push(path)
}

const toggleCollapse = () => {
  // TODO: 实现收起/展开逻辑
}

const getIconStyle = (icon?: unknown) => {
  if (typeof icon !== 'string') return {}
  return {
    backgroundImage: `url(${icon})`
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  width: 240px;
  height: 100%;
  background: #18213e;
  display: flex;
  flex-direction: column;
}

.nav-header {
  height: 82px;
  padding: 26px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  .logo {
    width: 190px;
    height: 55px;
    background-image: url('@/assets/components/navBar/编组 16.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .collapse-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-image: url('@/assets/components/navBar/菜单收起.svg');
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

.nav-menu {
  flex: 1;
  padding-top: 41px;
}

.nav-item {
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 34px;
  cursor: pointer;
  position: relative;
  background: #18213e;
  transition: all 0.2s;

  &:hover {
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 2%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &.active {
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.2) 2%,
      rgba(255, 255, 255, 0) 100%
    );

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 6px;
      height: 100%;
      background: #2979ff;
    }

    .nav-label {
      color: #ffffff;
      font-weight: 700;
    }
  }
}

.nav-icon {
  width: 16px;
  height: 16px;
  margin-right: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.nav-label {
  font-family: MicrosoftYaHei, sans-serif;
  font-size: 14px;
  color: #afbbe3;
  letter-spacing: 0;
  line-height: 22px;
  font-weight: 400;
}
</style>
