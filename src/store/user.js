import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currnetUser: {},
  }),
  actions: {
    setUser(user) {
      this.currnetUser = user
    },
    logout() {
      this.currnetUser = {}
    },
    checkUserLoggedIn() {
      return Object.keys(this.currnetUser).length !== 0
    },
  }
})
