import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: {},
  }),
  actions: {
    setUser(user) {
      this.currentUser = user
      this.saveUserToLocalStorage(user)
    },
    logout() {
      this.currentUser = {}
      this.clearUserFromLocalStorage()
    },
    checkUserLoggedIn() {
      return Object.keys(this.currentUser).length !== 0
    },
    saveUserToLocalStorage(user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    clearUserFromLocalStorage() {
      localStorage.removeItem('currentUser')
    },
    loadUserFromLocalStorage() {
      const userJson = localStorage.getItem('currentUser')
      if (userJson) {
        this.currentUser = JSON.parse(userJson)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}