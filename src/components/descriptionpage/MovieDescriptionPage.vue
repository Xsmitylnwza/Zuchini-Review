<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'
import NavBar from '../Homepage/NavBar.vue'
import RedBarTopic from './RedBarTopic.vue'
import RatingPage from './RatingPage.vue'
import Review from './Review.vue'
import LoadingScreen from './LoadingScreen.vue'
import { ReviewManagement } from '@/libs/ReviewManagement.js'
import {
  getMoviesDetails,
  getMoviesReviews,
  getUsersInfo,
} from '@/libs/fetchUtils.js'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const currnetUser = userStore.currnetUser

const route = useRoute()
const router = useRouter()
const moviesDetails = ref([])
const moviesCredits = ref([])
const moviesTrailer = ref([])
const currentPage = ref(1)
const moviesReview = ref(new ReviewManagement())
const isShowAllCrew = ref(false)
const isPlayVideo = ref(false)
const dataLoaded = ref(false)

onMounted(async () => {
  try {
    const dataDetails = await getMoviesDetails(route.params.id)
    const dataCredits = await getMoviesDetails(route.params.id, '/credits')
    const dataVideos = await getMoviesDetails(route.params.id, '/videos')
    const dataReview = await getMoviesReviews(
      import.meta.env.VITE_BASE_URL,
      route.params.id
    )
    const reviews = dataReview.reviews
    moviesDetails.value = dataDetails
    moviesCredits.value = dataCredits
    moviesTrailer.value = getmoviesTrailer(dataVideos)
    await Promise.all(
      reviews.map(async (review) => {
        const { username, imageUrl, likedComments } = await getUsersInfo(
          review.userId
        )
        const { rating, comment, id, likeCount } = review
        const userReview = {
          username,
          rating,
          comment,
          imageUrl,
          id,
          likeCount,
          isLiked: likedComments && likedComments.includes(review.userId),
        }
        moviesReview.value.addReview(userReview)
      })
    )
    dataLoaded.value = true
  } catch (error) {
    console.error(error)
  }
})

function handleClickReview() {
  if (userStore.checkUserLoggedIn()) {
    router.push({
      name: 'review',
      params: { id: route.params.id },
    })
  } else {
    router.push({
      name: 'login',
    })
  }
}

function getmoviesTrailer(videos) {
  return videos.results
    .filter((video) => video.type === 'Trailer')
    .filter((video) => video.name === 'Official Trailer')[0]
}

function timeFormat() {
  const hours = Math.floor(moviesDetails.value.runtime / 60)
  const remainminutes = moviesDetails.value.runtime % 60
  return `${hours} hour ${remainminutes} minute`
}
function revenueFormat(money) {
  const million = Math.floor(money / 1000000)
  const remain = money % 1000000
  return `$${million}.${String(remain).substring(0, 2)} million`
}
function crewFilter(job) {
  const data = moviesCredits.value.crew
    ?.filter((crew) => crew.job == job)
    .sort((a, b) => b.popularity - a.popularity)
    .map((crew) => crew.name)
  return data?.join(', ')
}

function getCastData() {
  const data = moviesCredits.value.cast?.filter((cast) => cast.profile_path)
  if (isShowAllCrew.value) {
    return data
  } else return data?.splice(0, 8)
}
function handleShowAllCrew() {
  isShowAllCrew.value = !isShowAllCrew.value
}
function setCurrentPage(page) {
  currentPage.value = page
}
function handleVideo() {
  isPlayVideo.value = !isPlayVideo.value
}
async function incrementLike(review) {
  if (userStore.checkUserLoggedIn()) {
    const [resReview, resUser] = await Promise.all([
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${review.id}`),
      fetch(`${import.meta.env.VITE_BASE_URL}/users/${currnetUser.id}`),
    ])
    const reviewUpdate = await resReview.json()
    const userData = await resUser.json()

    console.log('review = ', review.isLiked)
    if (!review.isLiked && !userData.likedComments.includes(review.id)) {
      await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${review.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...reviewUpdate,
            likeCount: reviewUpdate.likeCount + 1,
          }),
        }),
        fetch(`${import.meta.env.VITE_BASE_URL}/users/${currnetUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            likedComments: [...userData.likedComments, review.id],
          }),
        }),
      ])
      moviesReview.value.incrementLike(review.id)
    } else {
      console.log('User has already liked this review.')
    }
  } else {
    console.log('User is not logged in')
  }
}
function handleOptionChange(option) {
  moviesReview.value.sortReviewBy(option)
}
</script>

<template>
  <loadingScreen v-if="!dataLoaded" />
  <div
    v-if="dataLoaded"
    class="w-full h-full bg-cover"
    :style="{
      'background-image':
        'url(https://image.tmdb.org/t/p/original' +
        moviesDetails?.backdrop_path +
        ')',
      'background-attachment': 'fixed',
      'background-repeat': 'no-repeat',
    }"
  >
    <div class="bg-layer h-[100%]">
      <NavBar />

      <div
        class="w-[75%] m-[auto] font-istok text-white px-[45px] py-[10px] movieDetails-bg fade-up"
      >
        <div class="text-[40px] font-bold">{{ moviesDetails.title }}</div>
        <div class="flex justify-between mb-[20px]">
          <div class="w-[22%] mr-[3%] flex flex-col items-center">
            <img
              class="w-[225px]"
              :src="
                'https://image.tmdb.org/t/p/w500/' + moviesDetails.poster_path
              "
            />
            <label
              for="my_modal_7"
              class="btn font-bold text-[22px] mt-[10px] pt-[2px] text-white font-istok gradient-bg border hover:opacity-70"
              @click="handleVideo"
            >
              Trailer
            </label>
            <input type="checkbox" id="my_modal_7" class="modal-toggle" />
            <div class="modal" role="dialog">
              <div
                class="modal-box min-w-[200px] max-w-[1024px] h-[600px] p-0 flex items-center justify-center gradient-bg"
              >
                <iframe
                  v-if="isPlayVideo && moviesTrailer?.key"
                  class="w-[100%] h-[100%]"
                  :src="
                    'https://www.youtube.com/embed/' +
                    moviesTrailer?.key +
                    '?stop=1'
                  "
                  frameborder=" 0"
                  allowfullscreen
                  autoplay
                ></iframe>
                <div v-else class="text-[50px] text-white relative font-bold">
                  Trailer not found
                </div>
              </div>
              <label
                class="modal-backdrop border border-black"
                for="my_modal_7"
                @click="handleVideo"
              ></label>
            </div>
          </div>
          <div class="w-[75%] ml-[8px] font-semibold">
            <RedBarTopic :topic="'Movie info'" />
            <div class="mb-[5px] font-medium">{{ moviesDetails.overview }}</div>
            <div class="flex flex-wrap gap-[8px] items-center mb-[7px]">
              <div
                class="py-[4px] px-[15px] border-white border-2 rounded-[10px]"
                v-for="genere in moviesDetails.genres"
                :key="genere"
              >
                {{ genere.name }}
              </div>
            </div>
            <div>
              Original Language:
              <span class="font-medium">{{
                (moviesDetails.original_language = 'en' ? 'English' : 'IDK')
              }}</span>
            </div>
            <div>
              Director:
              <span class="font-medium">{{ crewFilter('Director') }}</span>
            </div>
            <div>
              Producer:
              <span class="font-medium">{{ crewFilter('Producer') }}</span>
            </div>
            <div>
              Release Data:
              <span class="font-medium">{{ moviesDetails.release_date }}</span>
            </div>
            <div>
              Budget:
              <span class="font-medium">{{
                revenueFormat(moviesDetails.budget)
              }}</span>
            </div>
            <div>
              Box Office:
              <span class="font-medium">{{
                revenueFormat(moviesDetails.revenue)
              }}</span>
            </div>
            <div>
              Runtime: <span class="font-medium"> {{ timeFormat() }}</span>
            </div>
          </div>
        </div>
        <div class="Menu">
          <div class="">
            <RedBarTopic :topic="'Casts & Crews'" />
            <div class="flex flex-wrap justify-center gap-[20px]">
              <div
                class="w-[100px]"
                v-for="cast in getCastData()"
                :key="cast.id"
              >
                <img
                  class="rounded-[3px] mb-[5px]"
                  width="100px"
                  height="1px"
                  :src="'https://image.tmdb.org/t/p/w500/' + cast.profile_path"
                />
                <a href="#" class="w-[50%] text-blue-500 hover:text-blue-600">{{
                  cast.original_name
                }}</a>
                <div class="text-[14px]">{{ cast.character }}</div>
              </div>
            </div>
            <div class="my-[15px]">
              <div class="ml-[auto] w-[100px]">
                <button @click="handleShowAllCrew">
                  <span class="hover:text-gray-400">{{
                    isShowAllCrew ? 'Hide' : 'Show All'
                  }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="Rating mb-[20px]">
            <RedBarTopic :topic="'Rating'" />
            <div class="pr-[30px]">
              <RatingPage
                v-if="dataLoaded"
                :rating="moviesReview.getAllRating()"
                :reviewer="moviesReview.getReviews().length"
              />
            </div>
          </div>
          <div class="Review">
            <RedBarTopic :topic="'Review'" />
            <div class="flex flex-col items-center p-[20px]">
              <p class="mb-[15px]">Review form is here!! Check to Enter form</p>
              <button
                class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg"
                @click="handleClickReview"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.83333 7.88235H17.1667M7.83333 12.5882H14.8333M19.5 2C20.4283 2 21.3185 2.37185 21.9749 3.03374C22.6313 3.69563 23 4.59335 23 5.52941V14.9412C23 15.8772 22.6313 16.775 21.9749 17.4368C21.3185 18.0987 20.4283 18.4706 19.5 18.4706H13.6667L7.83333 22V18.4706H5.5C4.57174 18.4706 3.6815 18.0987 3.02513 17.4368C2.36875 16.775 2 15.8772 2 14.9412V5.52941C2 4.59335 2.36875 3.69563 3.02513 3.03374C3.6815 2.37185 4.57174 2 5.5 2H19.5Z"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                REVIEW
              </button>
            </div>
          </div>
        </div>
        <div class="w-[100%]">
          <Review
            v-if="dataLoaded"
            :reviews="moviesReview.getReviewByPage(currentPage)"
            @incrementLike="incrementLike"
            @handleOptionChange="handleOptionChange"
          />
          <div class="flex justify-center gap-[5px] mt-[20px]">
            <div
              class="border rounded-md w-[25px] bg-black"
              :class="
                currentPage === page
                  ? 'bg-red-600 hover:bg-red-800'
                  : 'hover:bg-gray-700'
              "
              v-for="page in Math.ceil(moviesReview.getReviews().length / 3)"
              :key="page.length"
            >
              <button class="w-[100%] m-[auto]" @click="setCurrentPage(page)">
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(90deg, #c60000 0%, #600000 100%);
}

.movieDetails-bg {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.85) 42%,
    rgba(0, 0, 0, 1) 100%
  );
}

.bg-layer {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.15) 63%,
    rgba(0, 0, 0, 1) 83%
  );
}

.modal-box {
  width: 1550px;
}

.fade-up {
  animation: fadeUp 0.5s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
../../libs/fetchUtils.js
