<script setup>
import NavBar from './NavBar.vue'
import MoviePage from './MoviePage.vue'
import { ref, onMounted } from 'vue'

const movies = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/movies')
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
    <div class="text-white text-2xl ml-[5%] font-istok font-bold">
        RECCOMMENT
    </div>
    <div class="flex justify-center gap-[150px] mt-[20px]">
      <div class="carousel w-full ">
        <MoviePage
          v-for="(movie, index) in movies"
          :movie="movie"
          :index="index"
          :key="movie.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
