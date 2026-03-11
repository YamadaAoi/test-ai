/**
 * 用户信息
 */
interface AuthInfo {
  token?: string
  userName?: string
  invalidTime?: number
}

/**
 * 权限保存key
 */
const AUTH_KEY = 'demo-web-auth'

/**
 * 保存权限信息
 * @param auth - 权限信息
 * @param expire - 有效天数
 */
export function saveAuth(auth: AuthInfo, expire = 1) {
  const invalidTime = new Date().getTime() + expire * 24 * 60 * 60 * 1000
  const authInfo: AuthInfo = { ...auth, invalidTime }
  localStorage.setItem(AUTH_KEY, JSON.stringify(authInfo))
}

/**
 * 获取权限信息
 * @returns
 */
export function getAuth() {
  let info: AuthInfo | undefined
  const authStr = localStorage.getItem(AUTH_KEY)
  if (authStr) {
    try {
      const auth: AuthInfo = JSON.parse(authStr)
      if (auth?.invalidTime && auth?.token) {
        const cur = new Date().getTime()
        if (cur < auth.invalidTime) {
          info = auth
        }
      }
    } catch (error) {
      console.error(`解析鉴权信息失败！${error}`)
    }
  }
  if (!info) {
    removeAuth()
  }
  return info
}

/**
 * 删除保存的权限信息
 */
export function removeAuth() {
  localStorage.removeItem(AUTH_KEY)
}
