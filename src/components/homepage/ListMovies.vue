<script setup>
import { ref, onMounted } from "vue";
import { getGenre } from "../../libs/fetchUtils.js";
import MovieGenreFilter from "./MovieGenreFilter.vue";
const props = defineProps({
  dataMovies: {
    type: Array,
    default: [],
  },
});
const genres = ref([]);
const dataLoaded = ref(true);

function isMovieEmpty(genreId) {
  return !props.dataMovies.some((movie) => {
    return movie.genre_ids.includes(genreId)
  });

}

onMounted(async () => {
  try {
    genres.value = await getGenre();
    dataLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div v-for="genre in genres" :key="genre.id" class="movie-bg">
    <div :id="`${genre.id}`" v-if="!isMovieEmpty(genre.id)">
      <h1 class="text-white font-semibold mb-[15px] text-3xl p-3">
        {{ genre.genreName }}
      </h1>
      <MovieGenreFilter v-if="dataLoaded" :dataMovies="dataMovies" :genreId="genre.id" />
    </div>
  </div>
</template>
<style scoped>
.movie-bg {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.85) 100%);
}
</style>
