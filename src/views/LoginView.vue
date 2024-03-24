<script setup>
import { ref } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
import hashPassword from "@/composable/hashPassword";
import CationValidInput from "@/components/Homepage/CationValidInput.vue";
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
  const res = await fetch("http://localhost:5000/users");
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
      console.log(userStore)
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
          <h1 class="text-3xl text-white font-bold pt-8">LOGIN</h1>
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