import request from '@/utils/request'

export interface DeviceInfo {
  deviceName: string
  deviceSN: string
  status: string
  frequency: string
}

export interface DeviceStatusData {
  uptime: string
  cpu_usage: {
    value: number
    unit: string
  }
  memory_usage: {
    value: number
    unit: string
  }
  cpu_temperature: {
    value: number
    unit: string
    status: string
  }
  working_temperature: {
    value: number
    unit: string
    status: string
  }
  local_storage: {
    available: number
    total: number
    unit: string
  }
  ad_status: string
  rf_status: string
  bluetooth_status: string
  wifi_status: string
  fpga_status: string
  beidou_status: string
  beidou_time: string
  beidou_location: {
    latitude: number
    longitude: number
  }
  system_time: string
}

export interface DeviceInfoResult {
  code: number
  data?: DeviceInfo
  msg?: string
}

export interface DeviceStatusResult {
  code: number
  data?: DeviceStatusData
  msg?: string
}

export async function getDeviceInfo(): Promise<DeviceInfo> {
  const result = await request<DeviceInfoResult>({
    url: '/device/info',
    method: 'post'
  })

  if (result.code === 0 && result.data) {
    return result.data
  }

  throw new Error(result.msg || '设备信息查询失败')
}

export async function getDeviceStatus(
  deviceSN: string
): Promise<DeviceStatusData> {
  const result = await request<DeviceStatusResult>({
    url: '/device/status',
    method: 'post',
    data: { deviceSN }
  })

  if (result.code === 0 && result.data) {
    return result.data
  }

  throw new Error(result.msg || '设备状态查询失败')
}
