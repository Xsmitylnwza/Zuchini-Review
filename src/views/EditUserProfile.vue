<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router';
import { updateUser } from '@/libs/fetchUtils.js'
import { ref } from 'vue'
import NavBar from '@/components/sharedcomponents/NavBar.vue'
import hashPassword from '@/composable/hashPassword'
import isValidImageFile from '@/composable/isValidImageFile'
import { useToast } from 'vue-toastification';

const isEditing = ref(false)
const hovering = ref(false)
const router = useRouter();
const toast = useToast()
const userStore = useUserStore()
const currentUser = userStore.currentUser
const openModal = ref(false)
const profileImageUpload = ref(null)
const userInfo = ref({
  username: currentUser.username,
  email: currentUser.email,
  oldPassword: '',
  newPassword: '',
  imageUrl: currentUser.imageUrl,
})

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
    const data = await updateUser(newPasswordHashed, currentUser)
    if (data) {
      userStore.setUser({ ...userStore.currentUser, ...newPasswordHashed })
      router.push("/")
      toast.success('Update user successfully !!!')
    }
  }
}

function handleHover(isOpen) {
  hovering.value = isOpen
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

const openImageUpload = () => {
  profileImageUpload.value.click()
};

</script>

<template>
  <div class="bg-gradient-to-r from-black to-red-900 min-h-screen animate-fade-right">
    <NavBar />

    <div class="w-[80%] m-[auto] font-istok text-white bg-black px-24 py-8 bg-opacity-35 rounded-md">
      <div class="flex flex-col">
        <div class="flex w-full justify-center">
          <div class="text-xl font-bold">MyProfile</div>
        </div>
        <div class="flex flex-row" @mouseover=handleHover(true) @mouseleave=handleHover(false)>
          <div :class="isEditing ? '' : 'opacity-50'"
            class="flex w-[50%] h-[50%] items-center justify-center rounded-[50%]">
            <img class="rounded-full cursor-pointer w-[300px] h-[300px] hover:opacity-70" :src="userInfo.imageUrl"
              @click="openImageUpload" />
            <input class="hidden" type="file" ref="profileImageUpload" @change="handleFileChange"
              :disabled="!isEditing" />
          </div>
          <div class="flex flex-col w-full">
            <div class="flex flex-row-reverse w-full">
              <div class="flex">
                <button @click="toggleEditing" class="btn bg-red-600 hover:bg-red-800 text-black">
                  {{ isEditing ? 'Cancel' : 'Edit' }}
                </button>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="max-w-md mx-auto mt-4 text text-gray-500">
              <div class="mb-4">
                <label class="text-white mr-5">Username</label>
                <input type="text" placeholder="Enter username here..." v-model="userInfo.username"
                  class="input input-bordered input-info w-96 max-w-xs h-14" :disabled="!isEditing" />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Email</label>
                <input type="text" placeholder="Enter username here..." v-model="userInfo.email"
                  class="input input-bordered input-info w-96 max-w-xs h-14" :disabled="!isEditing" />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Enter old password</label>
                <input type="text" placeholder="Enter you old password" class="input" v-model="userInfo.oldPassword"
                  :disabled="!isEditing" />
              </div>
              <div class="mb-4">
                <label class="text-white mr-5">Enter new password</label>
                <input type="text" placeholder="Enter you old password" class="input" v-model="userInfo.newPassword"
                  :disabled="!isEditing" />
              </div>
              <div class="mb-4">
                <button class="btn bg-red-500 text-black hover:bg-white" @click="saveEditUser" :disabled="!isEditing">
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
