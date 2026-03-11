# 登录页

## 入口

- `src\views\login\LoginPage.vue`

## 预览

- `src\views\login\doc\preview\login.png`

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
