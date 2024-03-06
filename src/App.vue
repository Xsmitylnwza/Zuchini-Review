<script setup>
import MoviePage from './components/Homepage/MoviePage.vue';
import NavBar from './components/Homepage/NavBar.vue';
import Homepage from './components/Homepage/Homepage.vue';
import data from '/data/db.json'



</script>

<template>
  <Homepage>
    <template v-slot:navBar>
      <NavBar />
    </template>

    <template v-slot:moviePage>
      <template v-for="movie in data">
        <MoviePage :poster="movie.Poster" :title="movie.Title" />
      </template>
    </template>
  </Homepage>
  <div class="w-[100vh] h-[100vh]"></div>


</template>

<style scoped></style>./components/Homepage/MoviePage.vue./components/Homepage/NavBar.vue
