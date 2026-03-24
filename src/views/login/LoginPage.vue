<template>
  <div class="login-page">
    <div class="decor decor-electricity"></div>
    <div class="decor decor-glow"></div>
    <div class="decor decor-base"></div>
    <div class="decor decor-bubble decor-bubble-1"></div>
    <div class="decor decor-bubble decor-bubble-2"></div>
    <div class="decor decor-bubble decor-bubble-3"></div>
    <div class="decor decor-bubble decor-bubble-4"></div>
    <div class="decor decor-bubble decor-bubble-5"></div>
    <div class="decor decor-diamond"></div>

    <div class="login-card">
      <div class="logo-wrap">
        <div class="logo" :style="{ backgroundImage: `url(${logoUrl})` }"></div>
      </div>
      <h1 class="title">电磁监测处置系统</h1>
      <div class="input-group">
        <el-icon class="input-icon"><User /></el-icon>
        <input
          v-model="form.userName"
          class="input"
          placeholder="请输入用户名"
        />
      </div>
      <div class="input-group">
        <el-icon class="input-icon"><Lock /></el-icon>
        <input
          v-model="form.password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <button class="submit-btn" @click="handleLogin">登 录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/login/loginReq'
import logoUrl from '@/assets/login/logo.png'

const router = useRouter()

const form = reactive({
  userName: '',
  password: ''
})

async function handleLogin() {
  if (!form.userName || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  try {
    await login({ userName: form.userName, password: form.password })
    ElMessage.success('登录成功')
    router.push('/')
  } catch (err) {
    ElMessage.error(err instanceof Error ? err.message : '登录失败')
  }
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url('@/assets/login/背景.jpg') center / cover no-repeat;
}

.decor {
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;
}

.decor-electricity {
  left: 0.52%;
  top: 0;
  width: 61.3%;
  height: 75.65%;
  background-image: url('@/assets/login/电流.png');
}

.decor-glow {
  left: 9.48%;
  top: 6.02%;
  width: 42%;
  height: 74.63%;
  background-image: url('@/assets/login/圆光.png');
}

.decor-base {
  left: 14.22%;
  top: 53.24%;
  width: 32.6%;
  height: 36.2%;
  background-image: url('@/assets/login/底座.png');
  opacity: 0.88;
}

.decor-bubble-1 {
  left: 35.1%;
  top: 6.48%;
  width: 3.13%;
  height: 5.56%;
  background-image: url('@/assets/login/泡1.png');
  opacity: 0.5;
}

.decor-bubble-2 {
  left: 48.44%;
  top: 30.37%;
  width: 3.13%;
  height: 5.56%;
  background-image: url('@/assets/login/泡2.png');
  opacity: 0.79;
}

.decor-bubble-3 {
  left: 9.9%;
  top: 18.98%;
  width: 3.13%;
  height: 5.56%;
  background-image: url('@/assets/login/泡3.png');
  opacity: 0.28;
}

.decor-bubble-4 {
  left: 52.34%;
  top: 81.3%;
  width: 3.44%;
  height: 6.11%;
  background-image: url('@/assets/login/泡4.png');
  opacity: 0.45;
}

.decor-bubble-5 {
  left: 13.02%;
  top: 72.59%;
  width: 3.44%;
  height: 6.11%;
  background-image: url('@/assets/login/泡5.png');
  opacity: 0.9;
}

.decor-diamond {
  left: 11.82%;
  top: 70.46%;
  width: 5.83%;
  height: 10.37%;
  background-image: url('@/assets/login/位图.png');
  transform: rotate(81deg);
}

.login-card {
  position: absolute;
  right: 6.67%;
  top: 50%;
  transform: translateY(-50%);
  width: 27.5%;
  padding: 0 7.5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(176deg, #1b2769 0%, rgba(41, 55, 127, 0.19) 75%);
  border-radius: 6px;
  padding-top: 11%;
  padding-bottom: 9%;
}

.logo-wrap {
  width: 16.8%;
  margin-bottom: 30px;
}

.logo {
  width: 100%;
  padding-bottom: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 3px 4px 0 rgba(37, 83, 182, 0.15);
  border-radius: 50%;
}

.title {
  font-family: MicrosoftYaHei-Bold, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 40px;
}

.input-group {
  position: relative;
  width: 100%;
  margin-bottom: 14px;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 18px;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0 14px 0 42px;
  font-size: 16px;
  color: #fff;
  background: rgba(18, 123, 249, 0.1);
  border: 1px solid rgba(139, 175, 255, 0.56);
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
}

.submit-btn {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 700;
  font-family: MicrosoftYaHei-Bold, sans-serif;
  color: #fff;
  background: #2979ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 4px;

  &:hover {
    opacity: 0.9;
  }
}
</style>
