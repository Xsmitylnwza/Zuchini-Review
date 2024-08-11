<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import NavBar from "@/components/sharedcomponents/NavBar.vue";
import RedBarTopic from "@/components/sharedcomponents/RedBarTopic.vue";
import RatingBar from "@/components/sharedcomponents/RatingBar.vue";
import Review from "./Review.vue";
import LoadingScreen from "@/components/sharedcomponents/LoadingScreen.vue";
import ReviewModal from "../reviewpage/ReviewModal.vue";
import MovieDetail from "./MovieDetail.vue";
import MovieCaster from "./MovieCaster.vue";
import { ReviewManagement } from "@/libs/ReviewManagement.js";
import {
  getMoviesDetails,
  getMoviesReviews,
  addReview,
  updateReviewAndUser,
  getReviewByReviewId,
  getUserByUserId,
} from '@/libs/fetchUtils.js'
import { useUserStore } from '@/store/user'

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const route = useRoute();
const router = useRouter();
const moviesDetails = ref([]);
const moviesCredits = ref([]);
const moviesTrailer = ref([]);
const movieCasters = ref([]);
const currentPage = ref(1);
const moviesReview = ref(new ReviewManagement());
const isShowAllCrew = ref(false);
const isPlayVideo = ref(false);
const dataLoaded = ref(false);
const isReviewModalOpen = ref(false);

onMounted(async () => {
  try {
    const dataDetails = await getMoviesDetails(route.params.id)
    const dataCredits = await getMoviesDetails(route.params.id, '/credits')
    const dataVideos = await getMoviesDetails(route.params.id, '/videos')
    const dataReview = await getMoviesReviews(
      route.params.id
    )

    const reviews = dataReview
    moviesDetails.value = dataDetails
    moviesCredits.value = dataCredits
    moviesTrailer.value = getmoviesTrailer(dataVideos)
    await Promise.all(
      reviews.map(async (review) => {
        const { username, imageUrl, likedComments } = await getUserByUserId(
          review.userId
        )
        const { ratings: rating, comment, id, likeCount } = review
        const userReview = {
          username,
          rating,
          comment,
          imageUrl,
          id,
          likeCount,
          isLiked: likedComments.includes(review.id),
        }
        moviesReview.value.addReview(userReview)
      })
    )
    moviesDetails.value = {
      ...moviesDetails.value,
      director: crewFilter('Director'),
      producer: crewFilter('Producer'),
      budget: revenueFormat(moviesDetails.value.budget),
      revenue: revenueFormat(moviesDetails.value.revenue),
      runtime: timeFormat(),
      trailer: moviesTrailer.value?.key,
    };
    movieCasters.value = getCastData();

    dataLoaded.value = true;
  } catch (error) {
    console.error(error)
  }
})

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
  isShowAllCrew.value = !isShowAllCrew.value;
  movieCasters.value = getCastData()
}
function setCurrentPage(page) {
  currentPage.value = page
}
function handleVideo() {
  isPlayVideo.value = !isPlayVideo.value
}
function handleOptionChange(option) {
  moviesReview.value.sortReviewBy(option)
}
function reviewModalHandler(value) {
  if (userStore.checkUserLoggedIn()) {
    isReviewModalOpen.value = value
  } else {
    alert('You need to login first !!!')
    router.push('/login')
  }
}

async function incrementLike(review) {
  const reviewUpdate = await getReviewByReviewId(review.id);
  const userData = await getUserByUserId(currentUser.id);

  const updatedReview = {
    likeCount: reviewUpdate.likeCount + 1,
  }

  const updatedUser = {
    userId: userData.id,
    reviewId: review.id
  }

  await updateReviewAndUser(review.id, updatedReview, updatedUser, currentUser, "increment")
  moviesReview.value.incrementLike(review.id)
  moviesReview.value.updateIsLiked(review.id)
  if (!currentUser.likedComments.includes(review.id)) {
    currentUser.likedComments.push(review.id)
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
}

async function decrementLike(review) {
  const reviewUpdate = await getReviewByReviewId(review.id);
  const userData = await getUserByUserId(currentUser.id);

  const updatedReview = {
    likeCount: reviewUpdate.likeCount - 1,
  }

  const updatedUser = {
    likedComments: userData.likedComments.filter(
      (commentId) => commentId !== review.id
    ),
  }

  await updateReviewAndUser(review.id, updatedReview, updatedUser, currentUser, "decrement")
  moviesReview.value.decrementLike(review.id)
  moviesReview.value.updateIsLiked(review.id)
  currentUser.likedComments = currentUser.likedComments.filter(
    (commentId) => commentId !== review.id
  )
  localStorage.setItem('currentUser', JSON.stringify(currentUser))
}

async function toggleStatusLike(review) {
  const url = import.meta.env.VITE_BASE_URL
  if (userStore.checkUserLoggedIn()) {
    const resUser = await fetch(
      `${url}/users/${currentUser.id}`
    )
    const userData = await resUser.json()
    const isLiked = userData.likedComments.filter(element => {
      return Number(element) === Number(review.id)
    });
    if (!review.isLiked && isLiked.length === 0) {
      await incrementLike(review)
    } else {
      await decrementLike(review)
    }
  } else {
    alert('You need to login first !!!')
    router.push('/login')
  }
}

async function addNewReview(
  ratingScore,
  review,
  movieId,
  currentUserId,
  isAdd
) {
  const newRatingScore = { ...ratingScore }
  const response = await addReview(
    ratingScore,
    review,
    movieId,
    currentUserId,
    isAdd
  )

  const newReview = {
    id: response.id,
    username: currentUser.username,
    comment: review,
    rating: newRatingScore,
    imageUrl: currentUser.imageUrl,
    likeCount: 0,
    isLiked: false,
  }
  moviesReview.value.addReview(newReview)
  reviewModalHandler(false)
}

</script>

<template>
  <loadingScreen v-if="!dataLoaded" />
  <div v-if="dataLoaded" class="w-full h-full bg-cover" :style="{
    'background-image':
      'url(https://image.tmdb.org/t/p/original' +
      moviesDetails?.backdrop_path +
      ')',
    'background-attachment': 'fixed',
    'background-repeat': 'no-repeat',
  }">
    <div class="bg-layer h-[100%]">
      <NavBar />
      <Teleport to="body">
        <div v-if="isReviewModalOpen">
          <ReviewModal @closeModal="reviewModalHandler" @updateReview="addNewReview" :movieDetails="moviesDetails" />
        </div>
      </Teleport>
      <div class="w-[75%] m-[auto] font-istok text-white px-[25px] py-[10px] movieDetails-bg fade-up">
        <MovieDetail :movieDetails="moviesDetails" :isPlayVideo="isPlayVideo" @handleVideo="handleVideo" />
        <div class="Menu">
          <MovieCaster :movieCasters="movieCasters" :isShowAllCrew="isShowAllCrew"
            @handleShowAllCrew="handleShowAllCrew" />
          <div class="Rating mb-[20px]">
            <RedBarTopic :topic="'Rating'" />
            <div class="pr-[30px]">
              <RatingBar v-if="dataLoaded" :rating="moviesReview.getAllRating()"
                :reviewer="moviesReview.getReviews().length" />
            </div>
          </div>
          <div class="Review">
            <RedBarTopic :topic="'Review'" />
            <div class="flex flex-col items-center p-[20px]">
              <p class="mb-[15px]">Review form is here!! Check to Enter form</p>
              <div @click="reviewModalHandler(true)">
                <button
                  class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] text-[20px] rounded-[23px] hover:opacity-70 gradient-bg">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.83333 7.88235H17.1667M7.83333 12.5882H14.8333M19.5 2C20.4283 2 21.3185 2.37185 21.9749 3.03374C22.6313 3.69563 23 4.59335 23 5.52941V14.9412C23 15.8772 22.6313 16.775 21.9749 17.4368C21.3185 18.0987 20.4283 18.4706 19.5 18.4706H13.6667L7.83333 22V18.4706H5.5C4.57174 18.4706 3.6815 18.0987 3.02513 17.4368C2.36875 16.775 2 15.8772 2 14.9412V5.52941C2 4.59335 2.36875 3.69563 3.02513 3.03374C3.6815 2.37185 4.57174 2 5.5 2H19.5Z"
                      stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  REVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[100%]">
          <Review v-if="dataLoaded" :reviews="moviesReview.getReviewByPage(currentPage)"
            @toggleStatusLike="toggleStatusLike" @handleOptionChange="handleOptionChange"
            @setCurrentPage="setCurrentPage" :currentUserLikedComments="currentUser.likedComments" />
          <div class="flex justify-center gap-[5px] mt-[20px]">
            <div class="flex rounded-full border-opacity-65 w-[25px] bg-black items-center" :class="currentPage === page
              ? 'bg-red-600 hover:bg-red-800'
              : 'hover:bg-gray-900 bg-gray-700'
              " v-for="page in Math.ceil(moviesReview.getReviews().length / 3)" :key="page.length">
              <button class="w-[100%] mt-[2px] flex justify-center" @click="setCurrentPage(page)">
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
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.85) 42%,
      rgba(0, 0, 0, 1) 100%);
}

.bg-layer {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.15) 63%,
      rgba(0, 0, 0, 1) 83%);
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
