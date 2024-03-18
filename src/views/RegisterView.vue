<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";
import CationValidInput from "@/components/Homepage/CationValidInput.vue";
import hashPassword from "@/composable/hashPassword";
import toggleIconShowHidePassword from "@/composable/toggleShowHidePassword";
import passwordsMatch from "@/composable/passwordsMatch";

const userInfo = ref({
  username: "".trim(),
  email: "",
  imageUrl:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  password: "",
  confirmPassword: "",
});

const profileImageUpload = ref(null);
const isUsernameValid = ref(true);
const isEmailValid = ref(true);
const isPasswordValid = ref(true);

const passwordField = ref(null);
const confirmPasswordField = ref(null);

function isValidImageFile(filename) {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  const extension = filename.split(".").pop().toLowerCase();
  return allowedExtensions.includes(extension);
}

function validateUsername(username) {
  if (!username.trim()) {
    return false;
  }

  const regex = /^[a-zA-Z0-9_-]+$/;
  if (!regex.test(username)) {
    return false;
  }

  if (username.length < 3 || username.length > 20) {
    return false;
  }

  return true;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

function checkUserExists(users) {
  return users.find((user) => user.username === userInfo.value.username);
}

function resetCorrectData() {
  isUsernameValid.value = true;
  isEmailValid.value = true;
  isPasswordValid.value = true;
}

const register = async () => {
  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();
  resetCorrectData();
  if (res.status === 200) {
    if (checkUserExists(users) || !validateUsername(userInfo.value.username)) {
      isUsernameValid.value = false;
    } else if (!validateEmail(userInfo.value.email)) {
      isUsernameValid.value = true;
      isEmailValid.value = false;
    } else if (
      !passwordsMatch(
        userInfo.value.password,
        userInfo.value.confirmPassword
      ) ||
      !validatePassword(userInfo.value.password) ||
      !validatePassword(userInfo.value.confirmPassword)
    ) {
      isUsernameValid.value = true;
      isEmailValid.value = true;
      isPasswordValid.value = false;
    } else {
      isUsernameValid.value = true;
      isEmailValid.value = true;
      isPasswordValid.value = true;
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.value.username,
          email: userInfo.value.email,
          imageUrl: userInfo.value.imageUrl,
          password: await hashPassword(userInfo.value.password),
          confirmPassword: await hashPassword(userInfo.value.password),
        }),
      });
      await router.push("/login");
    }
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (isValidImageFile(file.name)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        userInfo.value.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};

const openImageUpload = () => {
  profileImageUpload.value.click();
};
</script>

<template>
  <div
    class="box-color w-screen h-screen flex justify-center items-center font-inter"
  >
    <div
      class="bg-color mx-auto w-3/5 flex justify-around py-4 px-12 rounded-lg"
    >
      <div class="flex flex-col gap-y-2 w-2/5">
        <h1 class="text-3xl text-white pl-24 font-bold">Register</h1>
        <div>
          <div class="w-20 ml-28">
            <img
              class="rounded-full cursor-pointer"
              :src="userInfo.imageUrl"
              @click="openImageUpload"
            />
            <input
              class="hidden"
              type="file"
              ref="profileImageUpload"
              @change="handleFileChange"
            />
          </div>
        </div>
        <label class="text-white">Username</label>
        <input
          type="text"
          placeholder="Enter username here..."
          v-model="userInfo.username"
          class="input input-bordered input-info w-96 max-w-xs h-14"
        />
        <CationValidInput
          text="Username is already exits or Invalid username"
          :check="isUsernameValid"
        />
        <label class="text-white">Email</label>
        <input
          type="text"
          placeholder="Enter email here..."
          v-model="userInfo.email"
          class="input input-bordered input-info w-80 max-w-xs h-14"
        />
        <CationValidInput
          text="Please Valid Email format"
          :check="isEmailValid"
        />
        <label class="text-white">Password</label>
        <div class="relative">
          <input
            type="password"
            placeholder="Enter password here..."
            v-model="userInfo.password"
            class="input input-bordered input-info w-96 max-w-xs h-14"
            ref="passwordField"
          />
          <img
            src="https://api.iconify.design/dashicons:hidden.svg?color=%23888888"
            class="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer mr-4"
            @click="toggleIconShowHidePassword($event, passwordField)"
          />
        </div>
        <CationValidInput
          v-if="!validatePassword(userInfo.password)"
          text="password should valid password format"
          :check="isPasswordValid"
        />
        <CationValidInput
          v-else-if="userInfo.password !== userInfo.confirmPassword"
          text="password dont match"
          :check="isPasswordValid"
        />
        <label class="text-white">Confirm Password</label>
        <div class="relative">
          <input
            type="password"
            placeholder="Enter password here..."
            v-model="userInfo.confirmPassword"
            class="input input-bordered input-info w-80 max-w-xs h-12"
            ref="confirmPasswordField"
          />
          <img
            src="https://api.iconify.design/dashicons:hidden.svg?color=%23888888"
            class="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer mr-4"
            @click="toggleIconShowHidePassword($event, confirmPasswordField)"
          />
        </div>
        <CationValidInput
          v-if="!validatePassword(userInfo.confirmPassword)"
          text="password should valid password format"
          :check="isPasswordValid"
        />
        <CationValidInput
          v-else-if="userInfo.password !== userInfo.confirmPassword"
          text="password dont match"
          :check="isPasswordValid"
        />
        <button
          class="btn btn-black py-2 w-80 text-white border-none hover:bg-stone-700"
          @click="register"
        >
          Register
        </button>
      </div>
      <div class="flex flex-col justify-around text-white w-96">
        <div class="flex justify-center flex-col items-center">
          <img src="/image/logo.png" alt="" />
        </div>
        <div class="flex justify-center flex-col items-center">
          <h3 class="text-xl font-bold">It's a pleasure to meet your ✨</h3>
          <p class="text-sm font-medium">
            Please Register before you get in to the website
          </p>
        </div>
        <div class="flex justify-center flex-col items-center gap-y-2">
          <p>Having account ? click here</p>
          <RouterLink
            :to="{ name: 'login' }"
            class="btn btn-red py-2 w-60 text-white border-none hover:bg-red-700"
            >Login</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.box-color {
  background: rgb(217, 26, 26);
  background: linear-gradient(
    104deg,
    rgba(217, 26, 26, 1) 4%,
    rgba(56, 18, 18, 1) 29%,
    rgba(62, 18, 18, 1) 50%,
    rgba(133, 18, 18, 1) 92%,
    rgba(209, 164, 15, 1) 100%
  );
}
.bg-color {
  background: rgb(56, 18, 18);
  background: linear-gradient(
    104deg,
    rgba(56, 18, 18, 1) 16%,
    rgba(163, 25, 25, 1) 83%
  );
}
.btn-black {
  background: #100f0f;
}
.btn-red {
  background: #fc0606;
}
</style>@/composable/toggleShowHidPassword