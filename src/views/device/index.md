# 设备管理内容组件

## 入口

- `src\views\device\DeviceStatus.vue`

## 设计图

- 禁止直接解压zip文件，使用`mcp-sketch_sketch_html_analyze`工具分析设计稿，参数如下：
- - file_path: `src\sketch\电磁信号保密监测器html.zip`
- - page_name: `新`
- - artboard_name: `设备管理-设备状态`
- - rect: `[240, 64, 1680, 1212]`
- - assets_path: `src\assets\device`
- 结合`mcp-sketch_sketch_html_analyze`返回的json和预览图片，只关注页面右下的设备管理区域
- 灵活运用百分比和flex进行组件布局（慎用绝对定位），输出高质量自适应组件，保证90%组件还原度
- 罗列出左侧的导航栏所有用到的图片，优先使用css背景图片，减少使用img标签和直接导入图片

## 功能

- 根据接口返回参数，渲染出对应的设备管理内容，5秒刷新一次数据
- 设备状态、网络配置、数据存储、设备升级、重启/重置、证书升级 各tab页分不同组件实现
- 状态图表可用`echarts`实现
- 在`mock`文件夹内编写mock数据，模拟接口调用

## 接口

### 1、查询设备信息

- **URL**: `/device/info`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Auth**: 需要 Bearer Token 认证

- 入参：无

- 成功出参

```json
{
  "code": 0,
  "data": {
    "deviceName": "哨兵",
    "deviceSN": "2409000100010004",
    "status": "1", // 1: 上线, 0: 离线
    "frequency": "9k~10G"
  }
}
```

- 失败出参

```json
{
  "code": 1,
  "msg": "设备信息查询失败"
}
```

### 1、查询设备状态

- **URL**: `/device/status`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Auth**: 需要 Bearer Token 认证

- 入参

```json
{
  "deviceSN": "2409000100010004"
}
```

- 成功出参

```json
{
  "code": 0,
  "data": {
    "uptime": "2天3小时15分钟",
    "cpu_usage": {
      "value": 50,
      "unit": "%"
    },
    "memory_usage": {
      "value": 50,
      "unit": "%"
    },
    "cpu_temperature": {
      "value": 58,
      "unit": "°C",
      "status": "正常"
    },
    "working_temperature": {
      "value": 65,
      "unit": "°C",
      "status": "异常"
    },
    "local_storage": {
      "available": 457,
      "total": 512,
      "unit": "GB"
    },
    "ad_status": "正常",
    "rf_status": "正常",
    "bluetooth_status": "异常",
    "wifi_status": "正常",
    "fpga_status": "正常",
    "beidou_status": "在位",
    "beidou_time": "2025-01-21 14:30:24",
    "beidou_location": {
      "latitude": 52.29195,
      "longitude": 0.171626
    },
    "system_time": "2025-01-21 14:30:24"
  }
}
```

- 失败出参

```json
{
  "code": 1,
  "msg": "设备状态查询失败"
}
```
