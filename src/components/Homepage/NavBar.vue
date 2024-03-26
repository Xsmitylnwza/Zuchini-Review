<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const currnetUser = userStore.currnetUser;
</script>

<template>
  <div
    class="sticky top-0 z-10 font-inter laptop:flex justify-between px-[40px] py-[10px] h-[120px] bg-gradient-to-b from-black via-black to-transparent">
    <div>
      <img src="/image/logo.png" class="w-[271px] h-[82px]" />
    </div>
    <div class="flex gap-[35px] items-center text-white font-semibold">
      <div>
        <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-6 h-6 opacity-70">
          <path fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <button class="hover:opacity-80">
        <RouterLink to="/">Home</RouterLink>
      </button>
      <button class="hover:opacity-80">Categories</button>
      <div>
        <div v-if="userStore.checkUserLoggedIn()" class="flex">
          <div class="flex items-center pr-3">{{ currnetUser.username }}</div>
          <div class="dropdown dropdown-end">
            <img tabindex="0" role="button" class="btn btn-circle" :src="currnetUser.imageUrl"></img>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-black bg-opacity-75">
              <div class="flex justify-center pt-5">
                <img :src="currnetUser.imageUrl" class="w-[30%]" />
              </div>
              <div class="flex justify-center pt-3 pb-4">{{ currnetUser.username }}</div>
              <li>
                <a>
                  <div class="flex items-center">
                    <img :src="currnetUser.imageUrl" class="w-[25%] pr-3" />
                    <div>Myprofile</div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="flex items-center">
                    <img src="/icons/editProfile.png" class="w-full pr-4" />
                    <div>Editprofile</div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="flex items-center" @click="userStore.logout()">
                    <img src="/icons/logouticon.png" class="w-full pr-4" />
                    <div class="text-red-500">Logout</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <button class="hover:opacity-80">
            <RouterLink to="/register">Register</RouterLink>
          </button>
          |
          <button class="text-red-500 hover:opacity-90">
            <RouterLink to="/login">Login</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
