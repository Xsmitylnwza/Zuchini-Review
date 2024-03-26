<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    default: 0
  }

});

</script>

<template>
  <div :id="'slide' + index" class="carousel-item relative w-full flex justify-center h-screen pt-[170px] ">
    <div class="flex relative bottom-[80px]">
      <a :href="'#slide' + (index === 0 ? 4 : index - 1)"
        class="btn btn-outline m-auto mr-11 shadow-inner shadow-black">❮</a>
    </div>
    <div class="blackBackground rounded-[15px] laptop:flex w-[80%] h-[550px] p-[30px]">
      <div>
        <img class="laptop:w-[300px] h-[500px] ml-[50px] rounded-[5px]"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
      </div>
      <div class="font-istok w-[420px] ml-8 text-white font-bold">
        <h1 class="text-[40px]">{{ movie.original_title }}</h1>
        <p class="text-[16px] mb-[10px]">Rating</p>
        <input class="w-[100%] h-[180px] mb-[20px] bg-black border border-white rounded-[16px]" type="text" />
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
        <div class="flex justify-center gap-[18px]">
          <RouterLink :to="{ path: '/movie/' + movie.id }">
            <button class="w-[193px] h-[58px] border border-white text-[15px] rounded-[23px] hover:opacity-70">
              Description
            </button>
          </RouterLink>
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
