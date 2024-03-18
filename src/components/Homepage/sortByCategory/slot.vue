<script setup>
import { sortByCategory, genreName } from "../../../composable/sortByGenseId"
console.log(sortByCategory)
</script>

<template>
  <div class="bg-black">
    <div>
      <div class="bg-red-900 text-white flex justify-center p-3 rounded-lg">
        {{ genreName }}
      </div>
      <div class="flex flex-row overflow-auto bg-black text-white">
        <div v-for="movie in sortByCategory" class="hover:bg-red-300 p-2">
          <img
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            class="imgs"
          />
          <p class="box flex justify-center">{{ movie.title }}</p>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgs {
  height: 200px;
  object-fit: cover;
  /* block-size: fit-content; */
}
.box {
  padding-block: 12px;
}
</style>
