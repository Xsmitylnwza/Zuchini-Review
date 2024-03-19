import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userState: {
      id: "",
      username: "",
      email: "",
      imageUrl: "",
      password: ""
    }
  }),
  actions: {
    setUserInfo(user) {
      this.userState.id = user.id
      this.userState.username = user.username
      this.userState.email = user.email
      this.userState.imageUrl = user.imageUrl
      this.userState.password = user.password
    },
    getUser() {
      return this.userState
    },
  }
})

