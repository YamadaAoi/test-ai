<template>
  <div class="progress-bar-wrapper">
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${value}%` }"></div>
    </div>
    <span v-if="label" class="progress-label">{{ label }}</span>
    <span v-else-if="unit" class="progress-value">{{ value }}{{ unit }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number
  unit?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  unit: '',
  label: ''
})
</script>

<style scoped lang="scss">
.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;

  .progress-track {
    width: 410px;
    height: 8px;
    background: #f0f4f8;
    border-radius: 4px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background-image: linear-gradient(270deg, #53b1ff 0%, #2979ff 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }

  .progress-value {
    font-family: 'DINAlternate-Bold', sans-serif;
    font-size: 24px;
    color: #1f1f21;
    font-weight: 700;
    line-height: 24px;
    min-width: 60px;
    text-align: right;
  }

  .progress-label {
    font-family: 'DINAlternate-Bold', sans-serif;
    font-size: 24px;
    color: #1f1f21;
    line-height: 24px;
  }
}
</style>
