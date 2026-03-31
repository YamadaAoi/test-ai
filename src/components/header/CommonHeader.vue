<template>
  <div class="common-header">
    <div class="breadcrumb">
      <span
        class="breadcrumb-item"
        v-for="(item, index) in breadcrumbs"
        :key="index"
      >
        <span v-if="index > 0" class="separator">/</span>
        <span
          class="breadcrumb-text"
          :class="{ active: index === breadcrumbs.length - 1 }"
        >
          {{ item }}
        </span>
      </span>
    </div>
    <div class="header-right">
      <div class="icon-btn clear-mode" title="清晰模式"></div>
      <div class="icon-btn message" title="消息"></div>
      <div class="icon-btn skin" title="皮肤"></div>
      <div class="icon-btn menu" title="菜单"></div>
      <div class="user-info">
        <div class="avatar"></div>
        <span class="username">{{ username }}</span>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  username: string
}>()

const route = useRoute()
const breadcrumbs = ref<string[]>([])

const updateBreadcrumbs = () => {
  const path = route.path
  const crumbs: string[] = ['主页']

  if (path.startsWith('/portal/')) {
    const segment = path.split('/')[2]
    if (segment && route.meta?.label) {
      crumbs.push(route.meta.label as string)
    }
  }

  breadcrumbs.value = crumbs
}

watch(
  () => route.path,
  () => updateBreadcrumbs(),
  { immediate: true }
)
</script>

<style scoped lang="scss">
.common-header {
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.breadcrumb {
  display: flex;
  align-items: center;

  .breadcrumb-item {
    display: flex;
    align-items: center;

    .separator {
      margin: 0 8px;
      color: #898c8f;
      font-size: 14px;
    }

    .breadcrumb-text {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #898c8f;
      letter-spacing: 0;
      line-height: 22px;
      font-weight: 400;

      &.active {
        color: #505255;
      }
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;

  .icon-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &.clear-mode {
      background-image: url('@/assets/components/header/清晰模式.svg');
    }

    &.message {
      background-image: url('@/assets/components/header/消息-1.svg');
    }

    &.skin {
      background-image: url('@/assets/components/header/皮肤-2.svg');
    }

    &.menu {
      background-image: url('@/assets/components/header/菜单-2.svg');
    }

    &:hover {
      opacity: 0.7;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 12px;
    cursor: pointer;

    .avatar {
      width: 26px;
      height: 26px;
      background-image: url('@/assets/components/header/头像.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .username {
      font-family: MicrosoftYaHei-Bold;
      font-size: 12px;
      color: #898c8f;
      letter-spacing: 0;
      line-height: 20px;
      font-weight: 700;
    }

    .arrow {
      width: 10px;
      height: 10px;
      background-image: url('@/assets/components/header/默认-下.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
