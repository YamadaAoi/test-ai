# 登录页

## 入口

- `src\views\login\LoginPage.vue`

## 设计图

- `sketch`设计稿核心文件内容位于`./sketch/login.json`，请读取并参照此json文件绘制页面，注意使用自适应布局，慎重使用绝对定位
- 背景和图标位于json同一层级，绘制页面时选择合适的图片，并生成正确的路径

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
