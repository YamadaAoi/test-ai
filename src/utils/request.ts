import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const settings: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE
}
const request = axios.create(settings)
request.defaults.timeout = 3 * 60 * 1000
//  请求拦截器
request.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer xxx`
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
