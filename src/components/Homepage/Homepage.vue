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
  const movieData = await getMovies("http://localhost:5000");
  movies.value = movieData.slice(0, 5);
  NotSliceMovies.value = movieData
  dataLoaded.value = true
  localStorage.removeItem("currentUser");

});
</script>

<template>
  <div class="laptop:bg-cover h-[100vh] max-w-[100%]"
    :style="{ 'background-image': 'url(' + '/image/avenger.jpg' + ')' }">
    <NavBar />
    <div class="text-white text-2xl ml-[5%] font-istok font-bold">
      RECCOMMENT
    </div>
    <div class="flex justify-center gap-[150px] mt-[20px]">
      <div class="carousel w-full">
        <MovieRecom v-for="(movie, index) in movies" :movie="movie" :index="index" :key="movie.id" />
      </div>
    </div>
    <ListModels v-if="dataLoaded" :dataMovies="NotSliceMovies" />
  </div>
</template>

<style scoped></style>../../libs/fetchUtils.js