<script setup>
import NavBar from '../Homepage/NavBar.vue'
import RedBar from '../commentedpage/RedBar.vue'
import RatingIcon from '../commentedpage/RatingIcon.vue'
import { ref, onMounted, computed } from 'vue'
import ReviewPage from '../reviewpage/ReviewPage.vue'
import { ReviewManagement } from '@/libs/ReviewManagement.js'
import { useUserStore } from '@/store/user'
import { stringify } from 'postcss'
import { getReviews, getMovies } from '@/libs/fetchUtils'
const userStore = useUserStore()

const showReview = ref(false)
const reviews = ref([])
const movies = ref([])
const currnetUser = userStore.currnetUser
const reviewSelected = ref(null)
const openRewiewModal = ({ id }) => {
  const review = reviews.value.find((review) => review.id === id)
  reviewSelected.value = review
  showReview.value = true
}

const reloadData = async () => {
  const getMoviesResponse = await getMovies(import.meta.env.VITE_BASE_URL)
  const getReviewsResponse = await getReviews()
  movies.value = getMoviesResponse
  reviews.value = getReviewsResponse.filter(
    (review) => review.userId === currnetUser.id
  )
}

const submitReview = async (review) => {
  await reloadData()
}

const onClickDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this review?')) return
  await fetch(import.meta.env.VITE_BASE_URL + '/reviews/' + id, {
    method: 'DELETE',
  })
  await reloadData()
}

onMounted(async () => {
  await reloadData()
})
</script>

<template>
  <div class="bg-gradient-to-r from-black to-red-900 min-h-screen">
    <NavBar />

    <div
      class="w-3/4 m-[auto] font-inter text-white px-24 py-8 bg-black bg-opacity-35 rounded-md"
    >
      <div class="flex pt-10 pb-10">
        <div class="mt-1">
          <RedBar />
        </div>
        <div class="font-semibold pr-2 pl-2">
          <h1 class="text-2xl">Reviewed</h1>
        </div>
      </div>

      <!-- Movies -->
      <div v-for="review in reviews" :key="review.id">
        <div>
          <div class="flex m-6">
            <div class="w-1/5">
              <h1>
                {{
                  movies.find((movie) => movie.id === review.movieId)
                    .original_title
                }}
              </h1>
            </div>
            <div class="flex justify-between w-full">
              <div class="flex">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 53 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="26.5"
                    cy="26.5"
                    r="26"
                    fill="#900505"
                    stroke="#FF0C0C"
                  />
                </svg>
                <p class="mx-2">{{ currnetUser.username }}</p>
              </div>
              <div class="flex gap-3">
                <button
                  class="underline text-blue-500"
                  @click="openRewiewModal(review)"
                >
                  Edit
                </button>
                <button
                  class="underline text-red-700"
                  @click="onClickDelete(review.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="flex h-[225px]">
            <img
              class="w-[175px]"
              :src="
                'https://image.tmdb.org/t/p/w500/' +
                movies.find((movie) => movie.id === review.movieId).poster_path
              "
            />
            <div class="p-8">
              <RatingIcon
                :value1="review.rating.performance"
                :value2="review.rating.production"
                :value3="review.rating.movie_Chapter"
                :value4="review.rating.entertainment"
                :value5="review.rating.worthiness"
              />
            </div>
            <div class="w-2/3 p-10 pb-10">
              {{ review.comment }}
            </div>
          </div>
        </div>
        <div class="flex justify-end w-full gap-2">
          <button type="button" class="flex gap-2 items-center">
            <div>
              Liked
              {{ review.likeCount }}
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675q.9-1.138 1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025q.9 1.137 2.45 2.675T12 18.3m0-6.825"
                />
              </svg>
            </div>
          </button>
        </div>
        <br />
        <hr />
      </div>
    </div>
  </div>
  <ReviewPage
    :open="showReview"
    :movieName="
      movies?.find((movie) => movie.id === reviewSelected?.movieId)
        ?.original_title
    "
    :image="
      'https://image.tmdb.org/t/p/w500/' +
      movies?.find((movie) => movie.id === reviewSelected?.movieId)?.poster_path
    "
    :rating="reviewSelected?.rating"
    :review="reviewSelected?.comment"
    :reviewId="reviewSelected?.id"
    :likeCount="reviewSelected?.likeCount"
    :movieId="reviewSelected?.movieId"
    @close="showReview = false"
    @submitReview="submitReview"
  />
</template>

<style scoped></style>
