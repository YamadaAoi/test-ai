<template>
  <div class="common-header">
    <div class="header-left">
      <span class="breadcrumb-parent">主页</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ currentPageName }}</span>
    </div>
    <div class="header-right">
      <div class="header-icons">
        <img
          src="@/assets/components/header/消息-1.svg"
          class="header-icon"
          alt="消息"
        />
        <img
          src="@/assets/components/header/皮肤-2.svg"
          class="header-icon"
          alt="皮肤"
        />
        <img
          src="@/assets/components/header/菜单-2.svg"
          class="header-icon"
          alt="菜单"
        />
      </div>
      <div class="user-info">
        <img
          src="@/assets/components/header/头像.svg"
          class="user-avatar"
          alt="头像"
        />
        <span class="username">{{ userStore.username }}</span>
        <img
          src="@/assets/components/header/默认-下.svg"
          class="dropdown-arrow"
          alt="下拉"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

const currentPageName = computed(() => {
  const meta = route.meta
  return (meta.label as string) || ''
})
</script>

<style scoped lang="scss">
.common-header {
  width: 100%;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
}

.breadcrumb-parent {
  font-family: 'MicrosoftYaHei', sans-serif;
  font-size: 14px;
  color: #898c8f;
  letter-spacing: 0;
  line-height: 22px;
}

.breadcrumb-separator {
  margin: 0 10px;
  font-size: 14px;
  color: #898c8f;
}

.breadcrumb-current {
  font-family: 'MicrosoftYaHei', sans-serif;
  font-size: 14px;
  color: #505255;
  letter-spacing: 0;
  line-height: 22px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-icons {
  display: flex;
  align-items: center;
  margin-right: 36px;
}

.header-icon {
  width: 24px;
  height: 24px;
  margin-left: 24px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-avatar {
  width: 26px;
  height: 26px;
  margin-right: 8px;
}

.username {
  font-family: 'MicrosoftYaHei-Bold', sans-serif;
  font-size: 12px;
  color: #898c8f;
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 700;
}

.dropdown-arrow {
  width: 10px;
  height: 10px;
  margin-left: 8px;
}
</style>
