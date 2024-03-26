import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currnetUser: {},
  }),
  actions: {
    setUser(user) {
      this.currnetUser = user
      this.saveUserToLocalStorage(user)
    },
    logout() {
      this.currnetUser = {}
      this.clearUserFromLocalStorage()
    },
    checkUserLoggedIn() {
      return Object.keys(this.currnetUser).length !== 0
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
        this.currnetUser = JSON.parse(userJson)
      }
    },
  },
})