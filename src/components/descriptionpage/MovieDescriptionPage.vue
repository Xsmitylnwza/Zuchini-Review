<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watchEffect } from "vue";
import NavBar from "../Homepage/NavBar.vue";
import RedBarTopic from "./RedBarTopic.vue";
import RatingPage from "./RatingPage.vue";
import Review from "./Review.vue";
import LoadingScreen from "./LoadingScreen.vue";
import router from "@/router";
import {
  getMoviesDetails,
  getMoviesCredits,
  getMoviesReviews,
} from "../../libs/fetchUtils.js";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const currnetUser = userStore.currnetUser;

const route = useRoute();
const infoDetails = ref([]);
const infoCredits = ref([]);
const infoReview = ref({ reviews: [] });
const reviewer = ref(0);
const reviewArray = ref([]);
const currentPage = ref(1);
const isShowAllCrew = ref(false);
const dataLoaded = ref(false);
let rating;

onMounted(async () => {
  try {
    const moviesDetails = await getMoviesDetails(route.params.id);
    const moviesCredits = await getMoviesCredits(route.params.id);
    const dataReview = await getMoviesReviews(
      import.meta.env.VITE_BASE_URL,
      route.params.id
    );

    infoDetails.value = moviesDetails;
    infoReview.value = dataReview;
    infoCredits.value = moviesCredits;
    dataLoaded.value = true;
    reviewer.value = infoReview.value.reviews?.length;
    reviewArray.value = showReviewByPage();
    rating = calRating();
    console.log(infoReview.value.backdrop_path);
    // console.log(infoDetails.value);
    // console.log(infoCredits.value);
  } catch (error) {
    console.error(error);
  }
});
watchEffect(() => {
  reviewArray.value = showReviewByPage(currentPage.value);
});

function timeFormat() {
  const hours = Math.floor(infoDetails.value.runtime / 60);
  const remainminutes = infoDetails.value.runtime % 60;
  return `${hours} hour ${remainminutes} minute`;
}
function revenueFormat(money) {
  const million = Math.floor(money / 1000000);
  const remain = money % 1000000;
  return `$${million}.${String(remain).substring(0, 2)} million`;
}
function crewFilter(job) {
  const data = infoCredits.value.crew
    ?.filter((crew) => crew.job == job)
    .sort((a, b) => b.popularity - a.popularity)
    .map((crew) => crew.name);
  return data?.join(", ");
}

function getCastData() {
  const data = infoCredits.value.cast?.filter((cast) => cast.profile_path);
  if (isShowAllCrew.value) {
    return data;
  } else return data?.splice(0, 8);
}
function handleShowAllCrew() {
  isShowAllCrew.value = !isShowAllCrew.value;
}

function calRating() {
  if (infoReview.value.reviews.length == 0) {
    return;
  } else {
    const performanceScore =
      infoReview.value.reviews?.reduce(
        (sum, review) => sum + review.rating.performance,
        0
      ) / infoReview.value.reviews?.length;
    const productionScore =
      infoReview.value.reviews?.reduce(
        (sum, review) => sum + review.rating.production,
        0
      ) / infoReview.value.reviews?.length;
    const movieChapterScore =
      infoReview.value.reviews?.reduce(
        (sum, review) => sum + review.rating.movie_Chapter,
        0
      ) / infoReview.value.reviews?.length;
    const entertainmentScore =
      infoReview.value.reviews?.reduce(
        (sum, review) => sum + review.rating.entertainment,
        0
      ) / infoReview.value.reviews?.length;
    const worthinessScore =
      infoReview.value.reviews?.reduce(
        (sum, review) => sum + review.rating.worthiness,
        0
      ) / infoReview.value.reviews?.length;
    return [
      performanceScore,
      productionScore,
      movieChapterScore,
      entertainmentScore,
      worthinessScore,
    ];
  }
}

function showReviewByPage(currentPage = 1) {
  return infoReview.value.reviews?.slice(
    (currentPage - 1) * 3,
    currentPage * 3
  );
}
function setCurrentPage(page) {
  currentPage.value = page;
}
async function incrementLike(review) {
  if (userStore.checkUserLoggedIn()) {
    const [resReview, resUser] = await Promise.all([
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${review.id}`),
      fetch(`${import.meta.env.VITE_BASE_URL}/users/${currnetUser.id}`),
    ]);
    const reviewUpdate = await resReview.json();
    const userData = await resUser.json();

    console.log("review = ", review.isLiked);
    if (!review.isLiked && !userData.likedComments.includes(review.id)) {
      await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${review.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...reviewUpdate,
            likeCount: reviewUpdate.likeCount + 1,
          }),
        }),
        fetch(`${import.meta.env.VITE_BASE_URL}/users/${currnetUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            likedComments: [...userData.likedComments, review.id],
          }),
        }),
      ]);
    } else {
      console.log("User has already liked this review.");
    }
  } else {
    console.log("User is not logged in");
  }
}
</script>

<template>
  <loadingScreen v-if="!dataLoaded" />
  <div v-if="dataLoaded" class="w-[100%] h-[100%]" :style="infoReview?.backdrop_path ? {
    'background-image': 'url(' + infoReview?.backdrop_path + ')',
    'background-size': '100%',
  } : {
    'background-image': 'url(/image/avenger.jpg)',
    'background-size': '100%'
  }">
    <div v-if="dataLoaded" class="bg-layer h-[100%]">
      <NavBar />
      <div class="w-[75%] m-[auto] font-istok text-white px-[45px] py-[10px] movieDetails-bg fade-up">
        <div class="text-[40px] font-bold">{{ infoDetails.title }}</div>
        <div class="flex justify-between mb-[20px]">
          <div class="w-[25%]">
            <img class="w-[225px]" :src="'https://image.tmdb.org/t/p/w500/' + infoDetails.poster_path
    " />
          </div>
          <div class="w-[75%] ml-[8px] font-semibold">
            <RedBarTopic :topic="'Movie info'" />
            <div class="mb-[5px] font-medium">{{ infoDetails.overview }}</div>
            <div class="flex flex-wrap gap-[8px] items-center mb-[7px]">
              <div class="py-[4px] px-[15px] border-white border-2 rounded-[10px]" v-for="genere in infoDetails.genres">
                {{ genere.name }}
              </div>
            </div>
            <div>
              Original Language:
              <span class="font-medium">{{
    (infoDetails.original_language = "en" ? "English" : "IDK")
  }}</span>
            </div>
            <div>
              Director:
              <span class="font-medium">{{ crewFilter("Director") }}</span>
            </div>
            <div>
              Producer:
              <span class="font-medium">{{ crewFilter("Producer") }}</span>
            </div>
            <div>
              Release Data:
              <span class="font-medium">{{ infoDetails.release_date }}</span>
            </div>
            <div>
              Budget:
              <span class="font-medium">{{
    revenueFormat(infoDetails.budget)
  }}</span>
            </div>
            <div>
              Box Office:
              <span class="font-medium">{{
      revenueFormat(infoDetails.revenue)
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
              <div class="w-[100px]" v-for="cast in getCastData()" :key="cast.id">
                <img class="rounded-[3px] mb-[5px]" width="100px" height="1px"
                  :src="'https://image.tmdb.org/t/p/w500/' + cast.profile_path" />
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
    isShowAllCrew ? "Hide" : "Show All"
  }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="Rating mb-[20px]">
            <RedBarTopic :topic="'Rating'" />
            <div class="pr-[30px]">
              <RatingPage v-if="dataLoaded" :rating="calRating()" :reviewer="reviewer" />
            </div>
          </div>
          <div class="Review">
            <RedBarTopic :topic="'Review'" />
            <div class="flex flex-col items-center p-[20px]">
              <p class="mb-[15px]">Review form is here!! Check to Enter form</p>
              <button
                class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg">
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
        <div class="w-[100%]">
          <Review v-if="dataLoaded && reviewArray.value?.length != 0" :reviews="reviewArray" :key="reviewArray"
            @incrementLike="incrementLike" />
          <div class="flex justify-center gap-[5px] mt-[20px]">
            <div class="border rounded-md w-[25px] bg-black" :class="currentPage === page
    ? 'bg-red-600 hover:bg-red-800'
      : 'hover:bg-gray-700'
    " v-for="page in Math.ceil(reviewer / 3)" :key="page.length">
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
</style>../../libs/fetchUtils.js