<script setup>
import NavBar from '@/components/sharedcomponents/NavBar.vue'
import { useUserStore } from '@/store/user'
import toggleIconShowHidePassword from '@/composable/toggleShowHidePassword'
import { updateUser } from '@/libs/fetchUtils.js'
import { ref } from 'vue'
import hashPassword from '@/composable/hashPassword'
const isEditing = ref(false)
const userStore = useUserStore()
const currentUser = userStore.currentUser
const openModal = ref(false)
const userInfo = ref({
  username: currentUser.username,
  email: currentUser.email,
  oldPassword: '',
  newPassword: '',
  imageUrl: currentUser.imageUrl,
})
const profileImageUpload = ref(null)
function toggleEditing() {
  isEditing.value = !isEditing.value
  openModal.value = true
}
async function saveEditUser() {
  const newPasswordHashed = {
    password: userInfo.value.password
      ? await hashPassword(userInfo.value.newPassword)
      : currentUser.password,
    confirmPassword: userInfo.value.password
      ? await hashPassword(userInfo.value.newPassword)
      : currentUser.password,
    username: userInfo.value.username,
    email: userInfo.value.email,
    imageUrl: userInfo.value.imageUrl,
  }

  if (
    userInfo.value.oldPassword
      ? await hashPassword(userInfo.value.oldPassword)
      : currentUser.password === currentUser.password
  ) {
    const response = await updateUser(newPasswordHashed, currentUser)
    userStore.setUser({ ...userStore.currentUser, ...newPasswordHashed })
    if (response.ok) {
      alert('Succesful')
    }
  }
}
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (isValidImageFile(file.name)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        userInfo.value.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
function isValidImageFile(filename) {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
  const extension = filename.split('.').pop().toLowerCase()
  return allowedExtensions.includes(extension)
}

const openImageUpload = () => {
  profileImageUpload.value.click()
}

</script>

<template>
  <div
    class="bg-gradient-to-r from-black to-red-900 min-h-screen animate-fade-right"
  >
    <NavBar />

    <div
      class="w-[80%] m-[auto] font-istok text-white bg-black px-24 py-8 bg-opacity-35 rounded-md"
    >
      <div class="flex flex-col">
        <div class="flex w-full justify-center">
          <div class="text-xl font-bold">MyProfile</div>
        </div>
        <div class="flex flex-row">
          <div
            :class="isEditing ? '' : 'opacity-50'"
            class="flex w-[50%] items-center justify-center"
          >
            <img
              class="rounded-full cursor-pointer w-[300px] h-[300px]"
              :src="userInfo.imageUrl"
              @click="openImageUpload"
            />
            <input
              class="hidden"
              type="file"
              ref="profileImageUpload"
              @change="handleFileChange"
              :disabled="!isEditing"
            />
          </div>
          <div class="flex flex-col w-full">
            <div class="flex flex-row-reverse w-full">
              <div class="flex">
                <button
                  @click="toggleEditing"
                  class="btn bg-red-600 hover:bg-red-800 text-black"
                >
                  {{ isEditing ? 'Cancel' : 'Edit' }}
                </button>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="max-w-md mx-auto mt-4">
              <div class="mb-4">
                <label class="text-white mr-5">Username</label>
                <input
                  type="text"
                  placeholder="Enter username here..."
                  v-model="userInfo.username"
                  class="input input-bordered input-info w-96 max-w-xs h-14"
                  :disabled="!isEditing"
                />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Email</label>
                <input
                  type="text"
                  placeholder="Enter username here..."
                  v-model="userInfo.email"
                  class="input input-bordered input-info w-96 max-w-xs h-14"
                  :disabled="!isEditing"
                />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Enter old password</label>
                <input
                  type="text"
                  placeholder="Enter you old password"
                  class="input"
                  v-model="userInfo.oldPassword"
                  :disabled="!isEditing"
                />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Enter new password</label>
                <input
                  type="text"
                  placeholder="Enter you old password"
                  class="input"
                  v-model="userInfo.newPassword"
                  :disabled="!isEditing"
                />
              </div>
              <div class="mb-4">
                <button
                  class="btn bg-red-500 text-black hover:bg-white"
                  @click="saveEditUser"
                  :disabled="!isEditing"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
