<template>
  <div class="device-page">
    <!-- 设备信息头部 -->
    <div class="device-header">
      <div class="device-info">
        <img :src="deviceIcon" alt="device" class="device-icon" />
        <div class="info-content">
          <div class="name-row">
            <span class="device-name">{{ deviceInfo?.deviceName || '-' }}</span>
            <img :src="editIcon" alt="edit" class="edit-icon" />
            <span
              class="device-status"
              :class="{ online: deviceInfo?.status === '1' }"
            >
              {{ deviceInfo?.status === '1' ? '上线' : '离线' }}
            </span>
          </div>
          <div class="sn-row">SN：{{ deviceInfo?.deviceSN || '-' }}</div>
        </div>
      </div>
      <div class="frequency-info">
        <span class="frequency-value">{{
          formatFrequency(deviceInfo?.frequency)
        }}</span>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="device-content">
      <!-- Tab 导航 -->
      <div class="tab-nav">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <img :src="tab.icon" :alt="tab.label" class="tab-icon" />
          <span class="tab-label">{{ tab.label }}</span>
        </div>
        <div class="tab-indicator" :style="indicatorStyle"></div>
      </div>

      <!-- Tab 内容 -->
      <div class="tab-content">
        <DeviceStatusTab v-if="activeTab === 'status'" :data="deviceStatus" />
        <NetworkConfigTab v-else-if="activeTab === 'network'" />
        <DataStorageTab v-else-if="activeTab === 'storage'" />
        <DeviceUpgradeTab v-else-if="activeTab === 'upgrade'" />
        <RestartResetTab v-else-if="activeTab === 'restart'" />
        <CertUpgradeTab v-else-if="activeTab === 'cert'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getDeviceInfo, getDeviceStatus } from '@/api/device/deviceReq'
import type { DeviceInfo, DeviceStatusData } from '@/api/device/deviceReq'
import { ElMessage } from 'element-plus'

import deviceIcon from '@/assets/device/哨兵.png'
import editIcon from '@/assets/device/icon_编辑.png'
import iconStatus from '@/assets/device/icon_设备状态_选中.svg'
import iconNetwork from '@/assets/device/icon_网络配置.svg'
import iconStorage from '@/assets/device/icon_数据存储.svg'
import iconUpgrade from '@/assets/device/icon_设备升级.svg'
import iconRestart from '@/assets/device/icon_重启重置.svg'
import iconCert from '@/assets/device/icon_证书升级.svg'

import DeviceStatusTab from './tabs/DeviceStatusTab.vue'
import NetworkConfigTab from './tabs/NetworkConfigTab.vue'
import DataStorageTab from './tabs/DataStorageTab.vue'
import DeviceUpgradeTab from './tabs/DeviceUpgradeTab.vue'
import RestartResetTab from './tabs/RestartResetTab.vue'
import CertUpgradeTab from './tabs/CertUpgradeTab.vue'

interface TabItem {
  key: string
  label: string
  icon: string
}

const tabs: TabItem[] = [
  { key: 'status', label: '设备状态', icon: iconStatus },
  { key: 'network', label: '网络配置', icon: iconNetwork },
  { key: 'storage', label: '数据存储', icon: iconStorage },
  { key: 'upgrade', label: '设备升级', icon: iconUpgrade },
  { key: 'restart', label: '重启/重置', icon: iconRestart },
  { key: 'cert', label: '证书升级', icon: iconCert }
]

const activeTab = ref('status')
const deviceInfo = ref<DeviceInfo | null>(null)
const deviceStatus = ref<DeviceStatusData | null>(null)

let refreshTimer: ReturnType<typeof setInterval> | null = null

const indicatorStyle = computed(() => {
  const index = tabs.findIndex(t => t.key === activeTab.value)
  return {
    transform: `translateX(${index * 100}%)`,
    width: '100%'
  }
})

function formatFrequency(freq?: string): string {
  if (!freq) return '-'
  return freq.replace('k', 'KHz~').replace('G', 'GHz')
}

async function fetchData() {
  try {
    if (!deviceInfo.value) {
      deviceInfo.value = await getDeviceInfo()
    }

    if (deviceInfo.value?.deviceSN) {
      deviceStatus.value = await getDeviceStatus(deviceInfo.value.deviceSN)
    }
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '获取设备信息失败')
  }
}

function startRefresh() {
  refreshTimer = setInterval(fetchData, 5000)
}

function stopRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

onMounted(() => {
  fetchData()
  startRefresh()
})

onUnmounted(() => {
  stopRefresh()
})
</script>

<style scoped lang="scss">
.device-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  background: #f5f7fa;
}

.device-header {
  background: #fff;
  box-shadow: 0 0 17px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .device-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .device-icon {
      width: 72px;
      height: 72px;
      object-fit: contain;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .name-row {
        display: flex;
        align-items: center;
        gap: 8px;

        .device-name {
          font-family: 'MicrosoftYaHei-Bold', sans-serif;
          font-size: 24px;
          color: #303032;
          font-weight: 700;
          line-height: 32px;
        }

        .edit-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .device-status {
          font-size: 14px;
          color: #505255;
          line-height: 22px;

          &.online {
            color: #1bb380;
          }
        }
      }

      .sn-row {
        font-size: 16px;
        color: #505255;
        line-height: 24px;
      }
    }
  }

  .frequency-info {
    .frequency-value {
      font-family: 'DINAlternate-Bold', sans-serif;
      font-size: 30px;
      color: #1f1f21;
      font-weight: 700;
      line-height: 24px;
    }
  }
}

.device-content {
  flex: 1;
  background: #fff;
  box-shadow: 0 0 17px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .tab-nav {
    position: relative;
    display: flex;
    padding: 0 16px;
    border-bottom: 1px solid #c8cbcd;

    .tab-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 16px 20px;
      cursor: pointer;
      transition: color 0.3s;

      .tab-icon {
        width: 16px;
        height: 16px;
      }

      .tab-label {
        font-size: 14px;
        color: #505255;
        line-height: 22px;
      }

      &.active {
        .tab-label {
          color: #2979ff;
          font-weight: 700;
        }
      }
    }

    .tab-indicator {
      position: absolute;
      bottom: 0;
      left: 16px;
      height: 2px;
      background: #2979ff;
      transition: transform 0.3s;
      width: calc(100% / 6);
    }
  }

  .tab-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  }
}
</style>
