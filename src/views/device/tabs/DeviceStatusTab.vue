<template>
  <div class="status-tab">
    <!-- 持续运行时长 -->
    <div class="uptime-card">
      <div class="uptime-label">
        <img :src="timeIcon" alt="time" class="uptime-icon" />
        <span>持续运行时长</span>
      </div>
      <div class="uptime-value">
        <span class="number">{{ days }}</span>
        <span class="unit">天</span>
        <span class="number">{{ hours }}</span>
        <span class="unit">小时</span>
        <span class="number">{{ minutes }}</span>
        <span class="unit">分钟</span>
      </div>
    </div>

    <!-- 状态卡片网格 -->
    <div class="status-grid">
      <!-- 左列 -->
      <div class="status-column">
        <StatusCard label="CPU使用率">
          <ProgressBar
            :value="data?.cpu_usage.value || 0"
            :unit="data?.cpu_usage.unit || '%'"
          />
        </StatusCard>

        <StatusCard label="CPU温度" :status="data?.cpu_temperature.status">
          <span class="temp-value"
            >{{ data?.cpu_temperature.value || 0
            }}{{ data?.cpu_temperature.unit || '°C' }}</span
          >
        </StatusCard>

        <StatusCard label="本地存储">
          <ProgressBar
            :value="storagePercent"
            :label="`${data?.local_storage.available || 0}${data?.local_storage.unit || 'GB'}可用，共${data?.local_storage.total || 0}${data?.local_storage.unit || 'GB'}`"
          />
        </StatusCard>

        <StatusCard label="射频状态" :status="data?.rf_status" />

        <StatusCard label="WiFi状态" :status="data?.wifi_status" />

        <StatusCard label="北斗状态" :status="data?.beidou_status" />

        <StatusCard label="北斗位置">
          <span class="location-value">
            纬度(<span class="highlight">{{
              data?.beidou_location.latitude || 0
            }}</span
            >) 经度(<span class="highlight">{{
              data?.beidou_location.longitude || 0
            }}</span
            >)
          </span>
        </StatusCard>
      </div>

      <!-- 右列 -->
      <div class="status-column">
        <StatusCard label="内存使用率">
          <ProgressBar
            :value="data?.memory_usage.value || 0"
            :unit="data?.memory_usage.unit || '%'"
          />
        </StatusCard>

        <StatusCard label="工作温度" :status="data?.working_temperature.status">
          <span class="temp-value"
            >{{ data?.working_temperature.value || 0
            }}{{ data?.working_temperature.unit || '°C' }}</span
          >
        </StatusCard>

        <StatusCard label="AD状态" :status="data?.ad_status" />

        <StatusCard label="蓝牙状态" :status="data?.bluetooth_status" />

        <StatusCard label="FPGA状态" :status="data?.fpga_status" />

        <StatusCard label="北斗时间">
          <span class="time-value">{{ data?.beidou_time || '-' }}</span>
        </StatusCard>

        <StatusCard label="系统时间">
          <span class="time-value">{{ data?.system_time || '-' }}</span>
        </StatusCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DeviceStatusData } from '@/api/device/deviceReq'
import StatusCard from '../components/StatusCard.vue'
import ProgressBar from '../components/ProgressBar.vue'

import timeIcon from '@/assets/device/时长.png'

interface Props {
  data?: DeviceStatusData | null
}

const props = withDefaults(defineProps<Props>(), {
  data: null
})

const days = computed(() => {
  if (!props.data?.uptime) return '0'
  const match = props.data.uptime.match(/(\d+)天/)
  return match ? match[1] : '0'
})

const hours = computed(() => {
  if (!props.data?.uptime) return '0'
  const match = props.data.uptime.match(/(\d+)小时/)
  return match ? match[1] : '0'
})

const minutes = computed(() => {
  if (!props.data?.uptime) return '0'
  const match = props.data.uptime.match(/(\d+)分钟/)
  return match ? match[1] : '0'
})

const storagePercent = computed(() => {
  if (!props.data?.local_storage) return 0
  const { available, total } = props.data.local_storage
  if (total === 0) return 0
  return Math.round((available / total) * 100)
})
</script>

<style scoped lang="scss">
.status-tab {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.uptime-card {
  border: 1px solid #c8cbcd;
  border-radius: 6px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .uptime-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    color: #303032;
    line-height: 26px;

    .uptime-icon {
      width: 72px;
      height: 72px;
      object-fit: contain;
    }
  }

  .uptime-value {
    display: flex;
    align-items: baseline;
    gap: 4px;

    .number {
      font-family: 'DINAlternate-Bold', sans-serif;
      font-size: 28px;
      color: #303032;
      font-weight: 700;
      line-height: 36px;
    }

    .unit {
      font-size: 28px;
      color: #303032;
      line-height: 36px;
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.status-grid {
  display: flex;
  gap: 16px;

  .status-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.temp-value {
  font-size: 14px;
  color: #303032;
  line-height: 22px;
}

.location-value {
  font-size: 24px;
  color: #1f1f21;
  line-height: 24px;

  .highlight {
    font-family: 'DINAlternate-Bold', sans-serif;
    font-weight: 700;
  }
}

.time-value {
  font-family: 'DINAlternate-Bold', sans-serif;
  font-size: 24px;
  color: #1f1f21;
  font-weight: 700;
  line-height: 24px;
}
</style>
