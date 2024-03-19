<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import NavBar from "../Homepage/NavBar.vue";
import RedBarTopic from "./RedBarTopic.vue";
import RatingPage from "./RatingPage.vue";
import Review from "./Review.vue";

const route = useRoute();
const infoDetails = ref([]);
const infoCredits = ref([]);
const infoReview = ref([]);
const infoUsers = ref([]);
const reviewer = ref(0)
const isShowAllCrew = ref(false);
const dataLoaded = ref(false);
const reviewArray = ref();
let rating;

onMounted(async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${route.fullPath.split("/")[2]
      }?language=en-US`;
    const urlcredit = `https://api.themoviedb.org/3/movie/${route.fullPath.split("/")[2]
      }/credits?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZmQ1ZWI0N2FhMTk3OWQ1ZjI3NWQzYzg3NjMwMCIsInN1YiI6IjY1ZWVjMjUxMmIxMTNkMDE3ZGY5Mjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1fR4x1gAywLqZIZBcaHET0fOF9DZTlawyjv446MzFe0",
      },
    };
    const responseReview = await fetch(
      `http://localhost:5000/movies/${route.params.id}/?_embed=reviews`
    );
    const responseInfo = await fetch(url, options);
    const responseCredit = await fetch(urlcredit, options);
    const dataReview = await responseReview.json();
    const dataInfo = await responseInfo.json();
    const dataCredit = await responseCredit.json();
    infoDetails.value = dataInfo;
    infoReview.value = dataReview;
    infoCredits.value = dataCredit;
    dataLoaded.value = true;
    reviewer.value = infoReview.value.reviews.length;
    reviewArray.value = dosomething();
    console.log(reviewArray.value.length)
    // console.log(infoReview.value);
    // console.log(infoDetails.value);
    // console.log(infoCredits.value);
    rating = calRating();
  } catch (error) {
    console.error(error);
  }
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
  const data = infoCredits.value.cast?.filter(cast => cast.profile_path)
  if (isShowAllCrew.value) {
    return data
  } else return data?.splice(0, 8)
}
function handleShowAllCrew() {
  isShowAllCrew.value = !isShowAllCrew.value;
}

function calRating() {
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

function dosomething() {
  return infoReview.value.reviews.slice(0, 3);
}

</script>

<template>
  <div class="w-[100%] h-[100%]" :style="{
    'background-image': 'url(' + infoReview?.backdrop_path + ')',
    'background-size': '100%',
  }">
    <div class="bg-layers h-[100%]">
      <NavBar />
      <div class="w-[75%] m-[auto] font-istok text-white px-[45px] py-[10px] blackBackground">
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
                class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background">
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
          <Review v-if="dataLoaded" :reviews="reviewArray" />
          <div class="flex justify-center gap-[5px]">
            <div class="border rounded-md w-[30px]" v-for="page in Math.ceil(reviewer / 3)">
              <button class="w-[100%]">{{ page }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-background {
  background-image: linear-gradient(90deg, #c60000 0%, #600000 100%);
}

.blackBackground {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.85) 42%,
      rgba(0, 0, 0, 1) 100%);
}

.bg-layers {
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.15) 63%,
      rgba(0, 0, 0, 1) 83%);
}
</style>./RedBarTopic.vue