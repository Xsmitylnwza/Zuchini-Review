<script setup>
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
userStore.loadUserFromLocalStorage();



</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
