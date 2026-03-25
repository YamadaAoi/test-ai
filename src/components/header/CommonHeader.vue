<template>
  <header class="common-header">
    <div class="breadcrumb">
      <span
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
      >
        <span class="breadcrumb-separator" v-if="index > 0">/</span>
        <span
          :class="{ 'breadcrumb-current': index === breadcrumbs.length - 1 }"
        >
          {{ item.label }}
        </span>
      </span>
    </div>
    <div class="header-right">
      <div class="header-icon clear-mode"></div>
      <div class="header-icon message">
        <span class="badge">3</span>
      </div>
      <div class="header-icon skin"></div>
      <div class="header-icon menu"></div>
      <div class="user-info">
        <div class="avatar"></div>
        <span class="username">{{ username }}</span>
        <div class="arrow-down"></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  username?: string
}>()

const route = useRoute()

interface BreadcrumbItem {
  label: string
  path: string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const matched = route.matched
  const result: BreadcrumbItem[] = []

  matched.forEach(record => {
    if (record.meta?.label) {
      result.push({
        label: record.meta.label as string,
        path: record.path
      })
    }
  })

  return result
})
</script>

<style scoped lang="scss">
.common-header {
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .breadcrumb-separator {
    color: #898c8f;
    font-size: 14px;
  }

  .breadcrumb-current {
    color: #505255;
  }

  span {
    font-family: MicrosoftYaHei, sans-serif;
    font-size: 14px;
    color: #898c8f;
    letter-spacing: 0;
    line-height: 22px;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.65;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &.clear-mode {
    background-image: url('@/assets/components/header/清晰模式.svg');
  }

  &.message {
    position: relative;

    background-image: url('@/assets/components/header/消息-1.svg');

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      background: #f56c6c;
      border-radius: 8px;
      color: #ffffff;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      padding: 0 4px;
    }
  }

  &.skin {
    background-image: url('@/assets/components/header/皮肤-2.svg');
  }

  &.menu {
    background-image: url('@/assets/components/header/菜单-2.svg');
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .avatar {
    width: 26px;
    height: 26px;
    background-image: url('@/assets/components/header/头像.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .username {
    font-family: MicrosoftYaHei-Bold, sans-serif;
    font-size: 12px;
    color: #898c8f;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 700;
  }

  .arrow-down {
    width: 10px;
    height: 10px;
    background-image: url('@/assets/components/header/默认-下.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
