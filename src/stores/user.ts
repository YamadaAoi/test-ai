import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('超级管理员')
  const avatar = ref('')

  function setUser(name: string, avatarPath?: string) {
    username.value = name
    if (avatarPath) avatar.value = avatarPath
  }

  function logout() {
    username.value = ''
    avatar.value = ''
  }

  return { username, avatar, setUser, logout }
})
