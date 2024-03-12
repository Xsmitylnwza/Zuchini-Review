<script setup>
import { ref, onMounted } from 'vue';
import MoviePage from './components/Homepage/MoviePage.vue';
import NavBar from './components/Homepage/NavBar.vue';
import Homepage from './components/Homepage/Homepage.vue';
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
      <MoviePage v-for="movie in movies" :movie="movie" :key="movie.id" />
    </template>
</Homepage>
<div class="w-[100vh] h-[100vh] "></div> -->
</template>

<style scoped></style>
