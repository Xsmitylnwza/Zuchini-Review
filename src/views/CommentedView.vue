<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import {
  getReviews,
  getMoviesDetails,
  deleteReviewById,
} from '@/libs/fetchUtils'
import { editReview } from '@/libs/fetchUtils'
import NavBar from '../components/homepage/NavBar.vue'
import RedBarTopic from '@/components/sharedcomponents/RedBarTopic.vue'
import RatingBar from '@/components/descriptionpage/RatingBar.vue'
import ReviewModal from '@/components/reviewpage/ReviewModal.vue'
import LoadingScreen from '@/components/sharedcomponents/LoadingScreen.vue'

const userStore = useUserStore()
const currentUser = userStore.currentUser
const reviews = ref([])
const movies = ref([])
const selectedReview = ref('')
const isReviewModalOpen = ref(false)
const moviesDetails = ref(false)
const dataLoaded = ref(false)

onMounted(async () => {
  reviews.value = await getReviews(`?userId=${userStore.currentUser.id}`)
  const movieDetailsPromises = reviews.value.map(async (review) => {
    const movieDetails = await getMoviesDetails(review.movieId)
    return movieDetails
  })
  movies.value = await Promise.all(movieDetailsPromises)
  moviesDetails.value = movies.value[0]
  selectedReview.value = reviews.value[0]
  dataLoaded.value = true
})

async function deleteReview(id) {
  let deleteindex
  const response = await deleteReviewById(id)
  if (response.ok) {
    reviews.value = reviews.value.filter((review, index) => {
      if (review.id === id) {
        deleteindex = index
      }
      return review.id !== id
    })
    movies.value.splice(deleteindex, 1)
  }
}
async function updateNewReview(ratingScore, comment) {
  selectedReview.value.comment = comment
  selectedReview.value.rating = ratingScore
  const response = await editReview(
    selectedReview.value,
    selectedReview.value.rating
  )
  if (response.ok) {
    reviews.value.forEach((review) => {
      if (review.id === selectedReview.value.id) {
        review.comment = comment
        review.rating = ratingScore
      }
    })
  }
  closeModal(false)
}

function reviewModalHandler(isOpen, index = 0) {
  moviesDetails.value = movies.value[index]
  selectedReview.value = reviews.value[index]
  isReviewModalOpen.value = isOpen
}

function closeModal(isOpen) {
  isReviewModalOpen.value = isOpen
}
</script>

<template>
  <loadingScreen v-if="!dataLoaded" />
  <div
    v-if="dataLoaded"
    class="bg-gradient-to-r from-black to-red-900 min-h-screen"
  >
    <NavBar />

    <Teleport to="body">
      <div v-if="isReviewModalOpen">
        <ReviewModal
          :movieDetails="moviesDetails"
          :reviewDetails="selectedReview"
          @closeModal="closeModal"
          @updateReview="updateNewReview"
        />
      </div>
    </Teleport>

    <div
      class="w-[80%] m-[auto] font-istok text-white px-24 py-8 bg-black bg-opacity-35 rounded-md"
    >
      <div class="mt-1">
        <RedBarTopic :topic="'Reviewed'" />
      </div>
      <div
        v-if="reviews.length !== 0"
        v-for="(review, index) in reviews"
        :key="review.id"
        class="w-[100%] h-[auto] min-h-[350px] flex mb-[30px] hover:bg-slate-700 hover:bg-opacity-35 p-3 rounded-xl"
      >
        <div class="w-[25%] flex flex-col items-center">
          <img
            class="w-[150px] h-[220px] mb-3"
            :src="
              'https://image.tmdb.org/t/p/w500/' + movies[index].poster_path
            "
          />
          <div class="text-[22px] mb-[20px] font-semibold">
            {{ movies[index].title }}
          </div>
        </div>
        <div class="w-[75%]">
          <div class="flex gap-[15px] mb-4">
            <div class="flex items-end">
              <img
                class="w-[75px] h-[50px] btn-circle"
                :src="currentUser.imageUrl"
              />
            </div>

            <div class="font-bold text-[22px] flex items-end">
              {{ currentUser.username }}
            </div>
            <div v-if="dataLoaded" class="w-full flex flex-row">
              <div class="flex flex-col gap-[15px]">
                <div
                  class="flex w-[full] h-[full] ml-3 p-3 pr-5 pb-5 bg-gray-600 bg-opacity-20 rounded-xl"
                >
                  <RatingBar
                    :rating="[
                      review.rating.entertainment,
                      review.rating.movie_Chapter,
                      review.rating.performance,
                      review.rating.production,
                      review.rating.worthiness,
                    ]"
                    :format="'comment'"
                  />
                </div>
              </div>
            </div>
            <div class="flex gap-[10px] ml-[auto] items-start justify-start">
              <div
                @click="reviewModalHandler(true, index)"
                class="hover:text-gray-300"
              >
                <button>Edit</button>
              </div>
              <div @click="deleteReview(review.id)" class="hover:text-red-500">
                <button>Delete</button>
              </div>
            </div>
          </div>
          <div v-if="dataLoaded" class="w-full flex flex-row">
            <div class="w-[100%] mb-[15px] ml-6">
              <div class="flex items-end h-full gap-4">
                <img
                  class="w-[40px] h-[40px] rounded-full"
                  :src="currentUser.imageUrl"
                />
                <div class="flex chat chat-start">
                  <div class="chat-bubble">{{ review.comment }}</div>
                </div>
              </div>

              <div class="flex gap-[10px] mt-[auto] ml-[auto] justify-end">
                <div>Liked {{ review.likeCount }}</div>
                <div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_90_1697)">
                      <path
                        d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_90_1697">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col">
        <h1 class="flex w-full text-xl font-istok">
          🚨You didn't have any review right now
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
