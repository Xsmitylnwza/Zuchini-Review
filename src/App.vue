<script setup>
import MoviePage from "./components/Homepage/MoviePage.vue";
import NavBar from "./components/Homepage/NavBar.vue";
import data from "/data/db.json";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <RouterView />
  </div>
  <!-- <Homepage>
    <template v-slot:navBar>
      <NavBar />
    </template>

<template v-slot:moviePage>
      <MoviePage />
      <MoviePage />
      <MoviePage />
    </template>
</Homepage>
<div class="w-[100vh] h-[100vh]"></div> -->
</template>




<style scoped></style>./components/Homepage/HomePage.vue
