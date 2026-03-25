import type { MockMethod } from 'vite-plugin-mock'

export default function (): MockMethod[] {
  return [
    {
      url: '/api/device/info',
      method: 'post',
      timeout: 500,
      response: {
        code: 0,
        data: {
          deviceName: '哨兵',
          deviceSN: '2409000100010004',
          status: '1',
          frequency: '9k~10G'
        }
      }
    },
    {
      url: '/api/device/status',
      method: 'post',
      timeout: 500,
      response: {
        code: 0,
        data: {
          uptime: '2天3小时15分钟',
          cpu_usage: {
            value: 50,
            unit: '%'
          },
          memory_usage: {
            value: 50,
            unit: '%'
          },
          cpu_temperature: {
            value: 58,
            unit: '°C',
            status: '正常'
          },
          working_temperature: {
            value: 65,
            unit: '°C',
            status: '异常'
          },
          local_storage: {
            available: 457,
            total: 512,
            unit: 'GB'
          },
          ad_status: '正常',
          rf_status: '正常',
          bluetooth_status: '异常',
          wifi_status: '正常',
          fpga_status: '正常',
          beidou_status: '在位',
          beidou_time: '2025-01-21 14:30:24',
          beidou_location: {
            latitude: 52.29195,
            longitude: 0.171626
          },
          system_time: '2025-01-21 14:30:24'
        }
      }
    }
  ]
}
