import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({})

  const setUser = (user) => {
    currentUser.value = user
    saveUserToLocalStorage(user)
  }

  const logout = () => {
    currentUser.value = {}
    clearUserFromLocalStorage()
    router.push('/')
  }

  const checkUserLoggedIn = () => {
    return Object.keys(currentUser.value).length !== 0
  }

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const clearUserFromLocalStorage = () => {
    localStorage.removeItem('currentUser')
  }

  const loadUserFromLocalStorage = () => {
    const userJson = localStorage.getItem('currentUser')
    if (userJson) {
      currentUser.value = JSON.parse(userJson)
    }
  }

  return {
    currentUser,
    setUser,
    logout,
    checkUserLoggedIn,
    loadUserFromLocalStorage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
