<script setup>
import { RouterLink } from 'vue-router'
import RatingBar from '../descriptionpage/RatingBar.vue'

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
})

</script>

<template>
  <div :id="'slide' + index" class="carousel-item relative w-full flex justify-center h-screen pt-[170px]">
    <div
      class="flex relative bottom-[80px] hover:animate-pulse hover:animate-infinite transition ease-in-out delay-150 hover:scale-110 duration-300 animate-shake animate-twice animate-duration-200 animate-delay-200">
      <a :href="'#slide' + (index === 0 ? 4 : index - 1)" class="m-auto mr-11"><svg width="35" height="66"
          viewBox="0 0 35 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 2L2 33L33 64" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>
    <RouterLink :to="{ path: '/movie/' + movie.id }">
      <div class="blackBackground rounded-[15px] laptop:flex justify-center items-row w-[100%] h-[550px] p-[30px]">
        <div class="w-[300px]">
          <img
            class="laptop:w-[300px] h-[500px] rounded-[5px] transition ease-in-out delay-150 hover:scale-105 duration-300 shadow-lg shadow-red-800 hover:shadow-none"
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
        </div>
        <div class="flex flex-col font-istok w-[800px] ml-8 text-white font-bold">
          <h1
            class="text-[40px] hover:text-red-500 transition hover:translate-x-10 ease-in-out delay-150 hover:scale-110 duration-300">
            {{ movie.title }}
          </h1>
          <p class="text-xl mb-[10px]">Rating</p>
          <div class="w-[500px] justify-center mb-4">
            <RatingBar :rating="ratingScore" :reviewer="reviewer" />
          </div>
          <div class="flex flex-col text-xl">
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
              <button
                class="w-[193px] h-[58px] text-[15px] rounded-[23px] bg-gradient-to-r from-red-500 to-black hover:from-red-500 hover:to-slate-900 transition ease-in-out delay-150 hover:scale-110 duration-300">
                See Description
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </RouterLink>
    <div
      class="flex relative bottom-[80px] hover:animate-pulse hover:animate-infinite transition ease-in-out delay-150 hover:scale-110 duration-300 animate-shake animate-twice animate-duration-200 animate-delay-200">
      <a :href="'#slide' + (index === 4 ? 0 : index + 1)" class="m-auto ml-11"><svg width="35" height="66"
          viewBox="0 0 35 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L33 33L2 64" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
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
