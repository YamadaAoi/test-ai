# 登录页

## 入口

- `src\views\login\LoginPage.vue`

## 设计图

- 禁止直接解压zip文件，使用`mcp-sketch_sketch_html_analyze`工具分析设计稿，参数如下：
- - file_path: `src\views\login\doc\sketch\登录 2html.zip`
- - page_name: `页面 1`
- - artboard_name: `00 _登录页`
- - assets_path: `src\assets\login`
- 首先使用`bash`工具的`cat`命令完整读取并解析mcp返回的json数据，一定要在json解析成功后再读取并查看mcp返回的预览图片
- 结合json数据和预览图片，合理推断页面布局（绝对定位是无奈之举，能不用就不用！），输出高质量自适应布局页面，保证90%页面还原度
- 妥善处理json里的图片，优先使用css背景图片，减少使用img标签

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
