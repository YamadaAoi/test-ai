import type { MockMethod } from 'vite-plugin-mock'

export default function (): MockMethod[] {
  return [
    {
      url: '/api/login',
      method: 'post',
      timeout: 1000,
      response: {
        code: 0,
        data: { userName: 'zz', token: 'xxxxxxx' }
      }
    }
  ]
}
