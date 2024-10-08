<script setup>
import { ref, onMounted } from 'vue'
import { getMoviesFromApi, getReviewsByMovieId } from '../../libs/fetchUtils.js'
import NavBar from '../sharedcomponents/NavBar.vue'
import MovieRecom from './MovieRecom.vue'
import ListMovies from './ListMovies.vue'
import Footer from './Footer.vue'
import LoadingScreen from '../sharedcomponents/LoadingScreen.vue'

const movies = ref([])
const notSliceMovies = ref([])
const ratingSum = ref([])
const reviewer = ref([])
const dataLoaded = ref(false)

onMounted(async () => {
  const movieData = []
  for (let i = 1; i <= 8; i++) {
    const movies = await getMoviesFromApi(i)
    movieData.push(...movies.results)
  }

  movies.value = movieData.slice(0, 5)
  notSliceMovies.value = movieData
  await movies.value.forEach(async (movie) => {
    const reviews = await getReviewsByMovieId(movie.id)
    reviewer.value.push(reviews.length)
    reviewRate(reviews)
  })
  dataLoaded.value = true
})

async function reviewRate(reviews) {
  const ratingArr = [0, 0, 0, 0, 0]
  for (const review of reviews) {
    ratingArr[0] += review.ratings.entertainment
    ratingArr[1] += review.ratings.movie_Chapter
    ratingArr[2] += review.ratings.performance
    ratingArr[3] += review.ratings.production
    ratingArr[4] += review.ratings.worthiness
  }
  const reviewSumEach = ratingArr.map((rev) =>
    reviews.length !== 0 ? rev / reviews.length : 0
  )
  ratingSum.value.push(reviewSumEach)
}
</script>

<template>
  <LoadingScreen v-if="!dataLoaded" />
  <div class="bg-cover h-full max-w-[100%] section-with-smooth-scroll" :style="{
    'background-image': 'url(/image/avenger.jpg)',
    'background-attachment': 'fixed',
    'background-repeat': 'no-repeat',
  }">
    <NavBar />
    <div class="text-white text-2xl ml-[5%] font-istok font-bold">
      RECOMMEND
    </div>
    <div class="h-[700px]">
      <div class="carousel w-full relative bottom-[150px] animate-fade-up animate-once">
        <MovieRecom v-if="dataLoaded && ratingSum.length === 5" v-for="(movie, index) in movies" :movie="movie"
          :index="index" :key="movie.id" :ratingScore="ratingSum[index]" :reviewer="reviewer[index]" />
      </div>
    </div>
    <div class="relative">
      <ListMovies v-if="dataLoaded" :dataMovies="notSliceMovies" />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
