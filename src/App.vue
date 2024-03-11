<script setup>
import { ref, onMounted } from 'vue';
import MoviePage from './components/Homepage/MoviePage.vue';
import NavBar from './components/Homepage/NavBar.vue';
import Homepage from './components/Homepage/Homepage.vue';

const movies = ref([]);


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/movies');
    const data = await response.json();
    movies.value = data.slice(0, 5);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <Homepage>
    <template v-slot:navBar>
      <NavBar />
    </template>
    <template v-slot:moviePage>
      <MoviePage v-for="movie in movies" :movie="movie" :key="movie.id" />
    </template>
  </Homepage>
  <div class="w-[100vh] h-[100vh] "></div>
</template>

<style scoped></style>
