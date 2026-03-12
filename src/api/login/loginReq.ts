import request from '@/utils/request'
import { saveAuth } from '@/utils/auth'

export interface LoginParams {
  userName: string
  password: string
}

export interface LoginResponse {
  userName: string
  token: string
}

export interface LoginResult {
  code: number
  data?: LoginResponse
  msg?: string
}

export async function login(params: LoginParams): Promise<boolean> {
  const result = await request<LoginResult>({
    url: '/login',
    method: 'post',
    data: params
  })

  if (result.code === 0 && result.data) {
    saveAuth({
      token: result.data.token,
      userName: result.data.userName
    })
    return true
  }

  throw new Error(result.msg || '登录失败')
}
