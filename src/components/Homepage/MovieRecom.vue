<script setup>
import { RouterLink } from "vue-router";
import RatingPage from "../descriptionpage/RatingPage.vue";

const props = defineProps({
  movie: {
    type: Object,
    default: null,
  },
  index: {
    type: Number,
    default: 0,
  },
  ratingScore: {
    type: Array,
    default: [0, 0, 0, 0, 0],
  },
  reviewer: {
    type: Number,
    default: 0,
  },
});

</script>

<template>
  <div :id="'slide' + index" class="carousel-item relative w-full flex justify-center h-screen pt-[170px]">
    <div class="flex relative bottom-[80px]">
      <a :href="'#slide' + (index === 0 ? 4 : index - 1)"
        class="btn btn-outline m-auto mr-11 shadow-inner shadow-black">❮</a>
    </div>
    <div class="blackBackground rounded-[15px] laptop:flex w-[80%] h-[550px] p-[30px]">
      <div>
        <img class="laptop:w-[300px] h-[500px] ml-[50px] rounded-[5px]"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
      </div>
      <div class="flex flex-col font-istok w-[800px] ml-8 text-white font-bold">
        <h1 class="text-[40px]">{{ movie.title }}</h1>
        <p class="text-[16px] mb-[10px]">Rating</p>
        <div class="w-[500px] justify-center border">
          <RatingPage :rating="ratingScore" :reviewer="reviewer" />
        </div>
        <div class="flex flex-col mb-[30px]">
          <p>Reviewer</p>
          <div class="flex gap-2">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20.5" fill="#900505" stroke="#FF0C0C" />
            </svg>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20.5" fill="#900505" stroke="#FF0C0C" />
            </svg>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20.5" fill="#900505" stroke="#FF0C0C" />
            </svg>
            <svg width="67" height="42" viewBox="0 0 67 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="46" cy="21" r="20.5" fill="#A3A3A3" />
              <circle cx="46" cy="21" r="20.5" fill="#5A0101" />
              <circle cx="46" cy="21" r="20.5" stroke="#7A0101" />

              <circle cx="35" cy="21" r="20.5" fill="#A3A3A3" />
              <circle cx="35" cy="21" r="20.5" fill="#820000" />
              <circle cx="35" cy="21" r="20.5" stroke="#B00000" />
              <circle cx="21" cy="21" r="20.5" fill="#B20707" stroke="#FF0404" />
              <text x="12" y="26" font-family="Arial" font-size="14" fill="white">
                +2
              </text>
            </svg>
          </div>
        </div>
        <div class="flex justify-end gap-[18px]">
          <RouterLink :to="{ path: '/movie/' + movie.id }">
            <button class="w-[193px] h-[58px] border border-white text-[15px] rounded-[23px] hover:opacity-70">
              See Description
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="flex relative bottom-[80px]">
      <a :href="'#slide' + (index === 4 ? 0 : index + 1)"
        class="btn btn-outline m-auto ml-11 shadow-inner shadow-black">❯</a>
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
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.85) 35%,
      rgba(0, 0, 0, 0.85) 100%);
}
</style>
