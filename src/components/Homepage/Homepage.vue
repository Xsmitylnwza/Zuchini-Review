<script setup>
import NavBar from "./NavBar.vue"
import MoviePage from "./MoviePage.vue"
import { ref, onMounted } from "vue"
import categoryList from "./sortByCategory/categoryList.vue"

const movies = ref([])

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:5000/movies")
    const data = await response.json()
    movies.value = data.slice(0, 5)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div
    class="laptop:bg-cover h-[100vh] max-w-[100%]"
    :style="{ 'background-image': 'url(' + '/image/avenger.jpg' + ')' }"
  >
    <NavBar />
    <div class="flex justify-center gap-[150px] mt-[20px]">
      <MoviePage v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
  </div>
  <categoryList></categoryList>
</template>

<style scoped></style>
