<script setup>
import { ref, onMounted } from "vue";
import { getMovies } from "../../libs/fetchUtils.js";
import NavBar from "./NavBar.vue";
import MovieRecom from "./MovieRecom.vue";
import ListModels from "../sortGenre/ListModels.vue"

const movies = ref([]);
const NotSliceMovies = ref([])
const dataLoaded = ref(false)

onMounted(async () => {
  const movieData = await getMovies(import.meta.env.VITE_BASE_URL);
  movies.value = movieData.slice(0, 5);
  NotSliceMovies.value = movieData
  dataLoaded.value = true
  localStorage.removeItem("currentUser");

});
</script>

<template>
  <div class="bg-cover h-full max-w-[100%] section-with-smooth-scroll" :style="{
    'background-image': 'url(/image/avenger.jpg)',
    'background-attachment': 'fixed',
    'background-repeat': 'no-repeat'
  }">
    <NavBar />
    <div class="text-white text-2xl ml-[5%] font-istok font-bold">
      RECCOMMENT
    </div>
    <div class="h-[700px]">
      <div class="carousel w-full relative bottom-[150px]">
        <MovieRecom v-for="(movie, index) in movies" :movie="movie" :index="index" :key="movie.id" />
      </div>
    </div>
    <div class="relative ">
      <ListModels v-if="dataLoaded" :dataMovies="NotSliceMovies" />
    </div>
  </div>
</template>

<style scoped></style>