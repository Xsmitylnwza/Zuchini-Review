<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
userStore.loadUserFromLocalStorage();
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>




<style scoped></style>
