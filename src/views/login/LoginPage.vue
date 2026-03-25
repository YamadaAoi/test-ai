<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="login-title">电磁信号保密监测器系统</h1>
      <div class="login-divider"></div>
      <div class="login-form">
        <div class="input-group">
          <span class="input-icon">
            <img src="@/assets/login/icon_账号.png" alt="账号" />
          </span>
          <input
            v-model="form.userName"
            type="text"
            placeholder="请输入用户名"
            class="login-input"
          />
        </div>
        <div class="input-group">
          <span class="input-icon">
            <img src="@/assets/login/icon_密码.png" alt="密码" />
          </span>
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            class="login-input"
          />
        </div>
        <button class="login-btn" @click="handleLogin" :disabled="loading">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </div>
    </div>
    <div class="login-footer">Copyright 中孚安全技术有限公司</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/login/loginReq'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  userName: '',
  password: ''
})

async function handleLogin() {
  if (!form.userName || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  loading.value = true
  try {
    const success = await login({
      userName: form.userName,
      password: form.password
    })
    if (success) {
      ElMessage.success('登录成功')
      router.push('/')
    }
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #2d5a7b 100%);
  background-image: url('@/assets/login/编组 7.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.login-container {
  width: 530px;
  min-height: 660px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 80px 65px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(10px);
  background-image: url('@/assets/login/登录框.png');
  background-size: 100% 100%;
  background-position: center;
}

.login-title {
  font-family: 'MicrosoftYaHei-Bold', sans-serif;
  font-size: 34px;
  color: #ffffff;
  text-align: center;
  line-height: 45px;
  font-weight: 700;
  margin: 0 0 20px 0;
  letter-spacing: 0;
}

.login-divider {
  width: 35px;
  height: 5px;
  background-image: url('@/assets/login/矩形.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 80px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  position: relative;
  width: 100%;
  height: 54px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #5a5c5e;
  border-radius: 27px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;

  &:focus-within {
    border-color: #2979ff;
  }
}

.input-icon {
  width: 24px;
  height: 24px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

.login-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'MicrosoftYaHei', sans-serif;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 24px;

  &::placeholder {
    color: #c3c4c7;
  }
}

.login-btn {
  width: 100%;
  height: 54px;
  background: #2979ff;
  border: none;
  border-radius: 27px;
  font-family: 'MicrosoftYaHei-Bold', sans-serif;
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0;
  line-height: 22px;
  margin-top: 20px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.login-footer {
  position: absolute;
  bottom: 52px;
  font-family: 'MicrosoftYaHei', sans-serif;
  font-size: 14px;
  color: #a4a7ab;
  letter-spacing: 0;
  line-height: 22px;
}
</style>
