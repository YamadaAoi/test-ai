/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type {
  Axios,
  AxiosDefaults,
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  HeadersDefaults
} from 'axios'
import { getAuth } from './auth'

interface CustomAxiosInstance extends Axios {
  <T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  <T = any, R = T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>

  create(config?: CreateAxiosDefaults): CustomAxiosInstance
  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  }
}

/**
 * axios实例
 * 请求拦截器内塞入Authorization
 * 响应拦截器内拦截401状态和业务非200状态
 * example: return request<ReturnValue>({ url: '', method: 'get' })
 */
const request: CustomAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
})

request.defaults.timeout = 3 * 60 * 1000

//  请求拦截器
request.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getAuth()?.token}`
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  async error => {
    // 服务器异常
    if (error.response) {
      console.error(error.response.status, error.response.statusText)
      // 登录过期，跳转到登录页
      if (error.response.status === 401) {
        // todo
      }
    }
    return await Promise.reject(error)
  }
)

export default request
