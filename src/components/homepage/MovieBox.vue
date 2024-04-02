<script setup>
const props = defineProps({
  movie: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="flex flex-col w-[255px] h-[292px] bg-cover rounded-[8px] shadow-lg shadow-red-700" :style="{
    'background-image':
      'url(\'https://image.tmdb.org/t/p/w500/' + movie.poster_path + '\')',
  }">
    <div class="h-[100%] relative">
      <div
        class="relative left-[72%] top-[80%] tooltip tooltip-error transition ease-in-out delay-150 hover:scale-110 duration-300"
        data-tip="See desciption">
        <button
          class="commenticon-bg rounded-full w-[60px] h-[60px] flex justify-center items-center p-2 :hover=bg-blue-800">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"
              fill="#F8F8F8" />
          </svg>
        </button>
      </div>
    </div>
    <div class="mt-[auto] w-[255px] h-[150px]">
      <div class="flex flex-col moviedetail-bg px-[15px] pb-[10px] h-[100%] rounded-lg">
        <div class="mt-[auto]">
          <div class="text-[22px] text-white font-bold text-nowrap overflow-hidden slide-right">
            <p class="w-[auto]">{{ movie.title }}</p>
          </div>
          <div class="flex flex-row justify-between mt-[10px]">
            <svg width="56" height="35" viewBox="0 0 56 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="38.5" cy="17.5" r="17" fill="#A3A3A3" />
              <circle cx="38.5" cy="17.5" r="17" fill="#5A0101" />
              <circle cx="38.5" cy="17.5" r="17" stroke="#7A0101" />
              <circle cx="29.5" cy="17.5" r="17" fill="#A3A3A3" />
              <circle cx="29.5" cy="17.5" r="17" fill="#820000" />
              <circle cx="29.5" cy="17.5" r="17" stroke="#B00000" />
              <circle cx="17.5" cy="17.5" r="17" fill="#B20707" stroke="#FF0404" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commenticon-bg {
  background: rgb(255, 0, 0);
  background: linear-gradient(110deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(84, 0, 0, 1) 100%);
}

.moviedetail-bg {
  background: rgb(217, 217, 217);
  background: linear-gradient(180deg,
      rgba(217, 217, 217, 0) 0%,
      rgba(0, 0, 0, 0.61) 18%,
      rgba(0, 0, 0, 1) 43%,
      rgba(0, 0, 0, 1) 100%);
}

div.slide-right:hover p {
  animation: 8s slide-right;
}

@keyframes slide-right {
  from {
    margin-left: 0%;
    width: 100%;
  }

  to {
    margin-left: -100%;
    width: 100%;
  }
}
</style>
