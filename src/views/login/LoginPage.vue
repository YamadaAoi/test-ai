<template>
  <div class="login-page">
    <div class="login-left">
      <div class="left-decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-4"></div>
        <div class="half-circle half-circle-1"></div>
        <div class="half-circle half-circle-2"></div>
      </div>
      <div class="left-content">
        <div class="slogan">让信用创造价值</div>
      </div>
    </div>
    <div class="login-right">
      <div class="right-content">
        <div class="logo-section">
          <el-icon class="logo-icon" :size="40"><DataLine /></el-icon>
          <span class="logo-text">信用飞传</span>
        </div>
        <h2 class="login-title">系统登录</h2>
        <el-form
          ref="formRef"
          :model="loginForm"
          :rules="rules"
          label-width="0"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
              size="large"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login-button"
              size="large"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="register-tip">
          还没有账号？<span class="register-link">立即注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { DataLine } from '@element-plus/icons-vue'
import { login } from '@/api/login/loginReq'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  userName: '',
  password: ''
})

const rules: FormRules = {
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (!valid) return

    loading.value = true
    try {
      await login(loginForm)
      ElMessage.success('登录成功')
      router.push('/')
    } catch (error) {
      ElMessage.error((error as Error).message || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

.login-left {
  flex: 0 0 60%;
  background-color: #7c3aed;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.left-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 20%;
}

.circle-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  left: 10%;
}

.circle-3 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 15%;
}

.circle-4 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  right: 25%;
}

.half-circle {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.08);
}

.half-circle-1 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  right: -50px;
}

.half-circle-2 {
  width: 200px;
  height: 200px;
  top: -50px;
  left: 30%;
}

.left-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.slogan {
  color: #fff;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 4px;
}

.login-right {
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-content {
  width: 400px;
  padding: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.logo-icon {
  color: #7c3aed;
  margin-right: 12px;
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 40px;
}

.login-button {
  width: 100%;
  background-color: #7c3aed;
  border-color: #7c3aed;
  height: 44px;
  font-size: 16px;
}

.login-button:hover,
.login-button:focus {
  background-color: #6d28d9;
  border-color: #6d28d9;
}

.register-tip {
  text-align: center;
  color: #999;
  font-size: 14px;
}

.register-link {
  color: #7c3aed;
  cursor: pointer;
  margin-left: 4px;
}

.register-link:hover {
  color: #6d28d9;
}
</style>
