<script setup>
import { onMounted, ref } from "vue";
import RatingPage from "./RatingPage.vue";
import { getUsersInfo } from "../../libs/fetchUtils.js";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const currnetUser = userStore.currnetUser;
defineEmits(["incrementLike", "handleOptionChange"]);

const props = defineProps({
  reviews: {
    type: Object,
    default: null,
  }
});


</script>

<template>
  <div v-if="reviews.length == 0" class="w-[100%] h-[150px] border-y border-gray-400 py-[10px] flex justify-center">
    <div class="font-istok text-[24px] m-[auto]">
      We didn't have any review right now...
    </div>
  </div>
  <div v-else class="flex flex-col">
    <div class="relative top-[50px] ml-[auto] rouned-[10px]">
      <select class="text-white font-bold p-[1px] border gradient-bg bg-red-600 hover:bg-red-700 rounded-[10px]"
        @change="$emit('handleOptionChange', $event.target.value)">
        <option value="most-liked" selected>Most like</option>
        <option value="high-rating">High rating</option>
        <option value="low-rating">Low rating</option>
      </select>
    </div>
    <div class="w-[100%] border-y border-white py-[10px] font-istok" v-for="review in reviews" :key="review.id">
      <div class="flex flex-row gap-[15px] items-center pl-2">
        <img class="w-[70px] rounded-full" :src="review.imageUrl" />
        <p class="text-[32px] font-bold">{{ review.username }}</p>
      </div>
      <div class="flex flex-row gap-[15px] w-[100%]">
        <div class="flex p-[15px] border-r border-gray-600 w-[32%]">
          <RatingPage
            :rating="[review.rating.entertainment, review.rating.movie_Chapter, review.rating.performance, review.rating.production, review.rating.worthiness]"
            :format="'comment'" />
        </div>
        <div class="flex flex-col p-[20px] w-[70%]">
          <div class="w-[100%] mb-[15px]">
            {{ review.comment }}
          </div>
          <div class="flex flex-row items-center justify-center gap-[5px] ml-[auto] mt-[auto]">
            <span>Liked {{ review.likeCount ? review.likeCount : '0' }}</span>
            <svg width="23" height="23" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
              @click="$emit('incrementLike', review)" fill="none" class="cursor-pointer hover:opacity-50">
              <g clip-path="url(#clip0_90_683)">
                <path
                  d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                  stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_90_683">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
</style>../../libs/fetchUtils.js