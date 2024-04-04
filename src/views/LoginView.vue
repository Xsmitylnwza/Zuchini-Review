<script setup>
import { ref } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
import hashPassword from "@/composable/hashPassword.js";
import CationValidInput from "@/components/CationValidInput.vue";
import toggleIconShowHidePassword from "@/composable/toggleShowHidePassword";
import passwordsMatch from "@/composable/passwordsMatch";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const userInfo = ref({
  id: "",
  username: "",
  email: "",
  imageUrl: "",
  password: "",
});

const passwordField = ref(null);
const isSuccess = ref(true);

const login = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
  const data = await res.json();
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].username === userInfo.value.username &&
      passwordsMatch(
        data[i].password,
        await hashPassword(userInfo.value.password)
      )
    ) {
      userInfo.value.username = data[i].username;
      userInfo.value.email = data[i].email;
      userInfo.value.imageUrl = data[i].imageUrl;
      userInfo.value.password = data[i].password;
      userInfo.value.id = data[i].id;
      userInfo.value.likedComments = data[i].likedComments;
      userStore.setUser(userInfo.value);
      await router.push("/");
    }
  }
  isSuccess.value = false;
};
</script>

<template>
  <div class="bg-color w-screen h-screen flex justify-center items-center font-inter">
    <div class="box-color mx-auto h-4/5 w-3/5 flex justify-around py-4 px-12 rounded-lg">
      <div class="flex flex-col justify-around text-white w-96">
        <div class="flex justify-center flex-col items-center">
          <img src="/image/logo.png" alt="" />
        </div>
        <div class="flex justify-center flex-col items-center">
          <h3 class="text-xl font-bold">Glad to see you 🎉</h3>
          <p class="text-sm font-medium">
            Please login before you get in to the website
          </p>
        </div>
        <div class="flex justify-center flex-col items-center gap-y-2">
          <p>Don't have account ? click here</p>
          <RouterLink :to="{ name: 'register' }"
            class="btn btn-black py-2 w-60 text-white hover:bg-gray-700 border-none">Register</RouterLink>
        </div>
      </div>

      <div class="flex flex-col items-center justify-around gap-y-2 w-2/5">
        <div>
          <h1 class="text-3xl text-white font-bold">LOGIN</h1>
        </div>
        <div class="flex flex-col gap-y-2">
          <label class="text-white">Username</label>
          <input type="text" placeholder="Enter username here..." v-model="userInfo.username"
            class="input input-bordered input-info w-96 max-w-xs" />
          <label class="text-white">Password</label>
          <div class="relative">
            <input type="password" placeholder="Enter password here..." v-model="userInfo.password"
              class="input input-bordered input-info w-96 max-w-xs" ref="passwordField" />
            <img src="https://api.iconify.design/dashicons:hidden.svg?color=%23888888"
              class="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer mr-2"
              @click="toggleIconShowHidePassword($event, passwordField)" />
          </div>
          <CationValidInput text="Username or Password incorrect!" :check="isSuccess" />
        </div>
        <button class="btn btn-red py-2 w-80 text-white hover:bg-red-700 border-none" @click="login">
          Login
        </button>
      </div>
      <div class="flex justify-end pt-2 ml-3 tooltip" data-tip="home">
        <RouterLink to="/">
          <div class="flex flex-col">
            <div class="flex justify-center">
              <button class="btn btn-circle bg-black border-none">
                <svg width="23" height="23" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="93" height="93" fill="url(#pattern0)" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_263_3" transform="scale(0.00390625)" />
                    </pattern>
                    <image id="image0_263_3" width="256" height="256"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </button>
            </div>
            <!-- <h1 class="text-white text-sm pt-1">Home</h1> -->
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style>
.bg-color {
  background: rgb(217, 26, 26);
  background: linear-gradient(104deg,
      rgba(217, 26, 26, 1) 4%,
      rgba(56, 18, 18, 1) 29%,
      rgba(62, 18, 18, 1) 50%,
      rgba(133, 18, 18, 1) 92%,
      rgba(209, 164, 15, 1) 100%);
}

.box-color {
  background: rgb(56, 18, 18);
  background: linear-gradient(104deg,
      rgba(56, 18, 18, 1) 16%,
      rgba(163, 25, 25, 1) 83%);
}

.btn-black {
  background: #100f0f;
}

.btn-red {
  background: #fc0606;
}
</style>
