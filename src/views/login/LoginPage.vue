<template>
  <div class="login-page">
    <div class="background">
      <img
        class="bg-image"
        src="./doc/sketch/assets/背景.jpg"
        alt="background"
      />
    </div>

    <div class="left-decoration">
      <img class="electric" src="./doc/sketch/assets/电流.png" alt="electric" />
      <img class="glow-circle" src="./doc/sketch/assets/圆光.png" alt="glow" />
      <img class="base" src="./doc/sketch/assets/底座.png" alt="base" />

      <div class="bubbles">
        <img
          class="bubble bubble-1"
          src="./doc/sketch/assets/泡1.png"
          alt="bubble1"
        />
        <img
          class="bubble bubble-2"
          src="./doc/sketch/assets/泡2.png"
          alt="bubble2"
        />
        <img
          class="bubble bubble-3"
          src="./doc/sketch/assets/泡3.png"
          alt="bubble3"
        />
        <img
          class="bubble bubble-4"
          src="./doc/sketch/assets/泡4.png"
          alt="bubble4"
        />
        <img
          class="bubble bubble-5"
          src="./doc/sketch/assets/泡5.png"
          alt="bubble5"
        />
      </div>
    </div>

    <div class="login-card">
      <h1 class="title">电磁监测处置系统</h1>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入账号"
            :prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登 录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/login/loginReq'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  userName: '',
  password: ''
})

const rules: FormRules = {
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    await login({
      userName: form.userName,
      password: form.password
    })

    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message || '登录失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left-decoration {
  position: absolute;
  left: 0;
  top: 0;
  width: 65%;
  height: 100%;
  z-index: 1;
}

.electric {
  position: absolute;
  left: 10px;
  top: 0;
  width: 1177px;
  height: 817px;
  pointer-events: none;
}

.glow-circle {
  position: absolute;
  left: 182px;
  top: 65px;
  width: 806px;
  height: 806px;
  pointer-events: none;
}

.base {
  position: absolute;
  left: 273px;
  bottom: 0;
  width: 626px;
  height: 391px;
  pointer-events: none;
  opacity: 0.88;
}

.bubbles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bubble {
  position: absolute;
  animation: float 12s ease-in-out infinite;
}

.bubble-1 {
  left: 674px;
  top: 70px;
  width: 60px;
  height: 60px;
  opacity: 0.5;
}

.bubble-2 {
  right: 170px;
  top: 328px;
  width: 60px;
  height: 60px;
  opacity: 0.79;
}

.bubble-3 {
  left: 190px;
  top: 205px;
  width: 60px;
  height: 60px;
  opacity: 0.28;
}

.bubble-4 {
  right: 95px;
  bottom: 108px;
  width: 66px;
  height: 66px;
  opacity: 0.45;
}

.bubble-5 {
  left: 250px;
  bottom: 116px;
  width: 66px;
  height: 66px;
  opacity: 0.9;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.login-card {
  position: absolute;
  right: 14%;
  top: 18%;
  width: 528px;
  height: 613px;
  z-index: 10;
  background: linear-gradient(176deg, #1b2769 0%, rgba(41, 55, 127, 0.19) 75%);
  border: 1px solid;
  border-image: linear-gradient(166deg, #a6cfff 0%, #839fd7 100%) 1;
  border-radius: 6px;
  padding: 80px 89px;
  box-sizing: border-box;
}

.title {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 111px;
  letter-spacing: 2px;
}

.login-form {
  width: 100%;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(18, 123, 249, 0.1);
  border: 1px solid rgba(139, 175, 255, 0.56);
  border-radius: 4px;
  box-shadow: none;
  padding: 4px 12px;
  transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: rgba(139, 175, 255, 0.8);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #2979ff;
  box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.2);
}

.login-form :deep(.el-input__inner) {
  color: #ffffff;
  height: 32px;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 16px;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

.login-form :deep(.el-input__prefix) {
  color: rgba(255, 255, 255, 0.6);
}

.login-form :deep(.el-form-item) {
  margin-bottom: 30px;
}

.login-form :deep(.el-form-item__error) {
  color: #ff6b6b;
  font-size: 12px;
  padding-top: 4px;
}

.login-button {
  width: 100%;
  height: 40px;
  background: #2979ff;
  border: none;
  border-radius: 4px;
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 8px;
}

.login-button:hover {
  background: #3b8aff;
}

.login-button:active {
  background: #1a6ae8;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 1400px) {
  .login-card {
    right: 8%;
    width: 450px;
    padding: 60px 70px;
  }

  .title {
    font-size: 28px;
    margin-bottom: 80px;
  }
}

@media (max-width: 1024px) {
  .left-decoration {
    display: none;
  }

  .login-card {
    right: 50%;
    transform: translateX(50%);
    top: 50%;
    transform: translateX(50%) translateY(-50%);
  }
}
</style>
