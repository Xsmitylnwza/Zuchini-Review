<script setup>
import { ref, onMounted } from 'vue'
import { getMovies } from '../../libs/fetchUtils.js'
import NavBar from './NavBar.vue'
import MovieRecom from './MovieRecom.vue'
import ListModels from '../sortGenre/ListModels.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const movies = ref([])
const NotSliceMovies = ref([])
const ratingSum = ref([])
const reviewer = ref([])
const dataLoaded = ref(false)
userStore.loadUserFromLocalStorage()

onMounted(async () => {
  const movieData = await getMovies(import.meta.env.VITE_BASE_URL)
  movies.value = movieData.slice(0, 5)
  NotSliceMovies.value = movieData
  await movies.value.forEach(async (movie) => {
    const respone = await fetch(
      `${import.meta.env.VITE_BASE_URL}/reviews?movieId=${movie.id}`
    )
    const review = await respone.json()
    reviewer.value.push(review.length)
    test(review)
  })
  dataLoaded.value = true
})

async function test(review) {
  const ratingArr = [0, 0, 0, 0, 0]
  review.forEach((re) => {
    console.log(re)
  })
  for (const re of review) {
    ratingArr[0] += re.rating.entertainment
    ratingArr[1] += re.rating.entertainment
    ratingArr[2] += re.rating.performance
    ratingArr[3] += re.rating.production
    ratingArr[4] += re.rating.worthiness
  }
  const reviewSumEach = ratingArr.map(rev => review.length !== 0 ? rev / review.length : 0);
  ratingSum.value.push(reviewSumEach)
}
</script>

<template>
  <div class="bg-cover h-full max-w-[100%] section-with-smooth-scroll" :style="{
    'background-image': 'url(/image/avenger.jpg)',
    'background-attachment': 'fixed',
    'background-repeat': 'no-repeat',
  }">
    <NavBar />
    <div class="text-white text-2xl ml-[5%] font-istok font-bold">
      RECCOMMENT
    </div>
    <div class="h-[700px]">
      <div class="carousel w-full relative bottom-[150px]">
        <MovieRecom
          v-if="dataLoaded && ratingSum.length === 5"
          v-for="(movie, index) in movies"
          :movie="movie"
          :index="index"
          :key="movie.id"
          :ratingScore="ratingSum[index]"
          :reviewer="reviewer[index]"
        />
      </div>
    </div>
    <div class="relative">
      <ListModels v-if="dataLoaded" :dataMovies="NotSliceMovies" />
    </div>
  </div>
</template>

<style scoped></style>
