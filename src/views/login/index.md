# 登录页

## 入口

- `src\views\login\LoginPage.vue`

## 设计图

- 禁止直接解压zip文件，使用`mcp-sketch_sketch_html_analyze`工具分析设计稿，参数如下：
- - file_path: `src\sketch\电磁信号保密监测器html.zip`
- - page_name: `新`
- - artboard_name: `登录`
- - assets_path: `src\assets\login`
- 结合`mcp-sketch_sketch_html_analyze`返回的json和预览图片，灵活运用百分比和flex进行页面布局（慎用绝对定位），输出高质量自适应布局页面，保证90%页面还原度
- 罗列出json里所有提到的图片，优先使用css背景图片，减少使用img标签和直接导入图片

## 功能

- 输入用户名和密码，若验证通过则跳转至首页；否则提示登录失败
- 用户名为普通输入框，密码为密码输入框
- 登录接口调用方法位于`src\api\login\loginReq.ts`
- 登录成功后调用`src\utils\auth.ts`里的`saveAuth`方法存储登录信息

## 接口

### 1、登录

用于在系统中登录

- **URL**: `/login`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Auth**: 不需要 Bearer Token 认证

- 入参

```json
{
  "userName": "zz",
  "password": "123"
}
```

- 成功出参

```json
{
  "code": 0,
  "data": { "userName": "zz", "token": "xxxxxxx" }
}
```

- 失败出参

```json
{
  "code": 1,
  "msg": "密码错误"
}
```
