<template>
  <div class="status-card">
    <span class="card-label">{{ label }}</span>
    <div class="card-content">
      <slot />
      <span v-if="status" class="card-status" :class="statusClass">
        {{ status }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  status?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: ''
})

const statusClass = computed(() => {
  if (!props.status) return ''
  if (props.status === '正常' || props.status === '在位') {
    return 'status-normal'
  }
  return 'status-error'
})
</script>

<style scoped lang="scss">
.status-card {
  border: 1px solid #c8cbcd;
  border-radius: 6px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .card-label {
    font-size: 14px;
    color: #303032;
    line-height: 22px;
  }

  .card-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-status {
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;

    &.status-normal {
      color: #1bb380;
    }

    &.status-error {
      color: #e5433e;
    }
  }
}
</style>
