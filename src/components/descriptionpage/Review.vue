<script setup>
import { ref, watchEffect } from 'vue'
import RatingBar from '@/components/sharedcomponents/RatingBar.vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

defineEmits(['toggleStatusLike', 'handleOptionChange'])

const props = defineProps({
  reviews: {
    type: Array,
    default: [],
  },
  currentUserLikedComments: {
    type: Array,
    default: [],
  },
})

const toggleColor = ref({})

watchEffect(() => {
  const colorMap = {}
  for (const review of props.reviews) {
    colorMap[review.id] = props.currentUserLikedComments?.includes(review.id)
  }
  toggleColor.value = colorMap
});



</script>

<template>
  <div v-if="reviews.length == 0" class="w-[100%] h-[150px] border-y border-gray-400 py-[10px] flex justify-center">
    <div class="font-istok text-[24px] m-[auto]">
      We didn't have any review right now...
    </div>
  </div>
  <div v-else class="flex flex-col">
    <div class="relative ml-[auto] rouned-[10px]">
      <select class="text-white font-bold p-[1px] bg-black" @change="$emit('handleOptionChange', $event.target.value)">
        <option value="most-liked" selected>Most like</option>
        <option value="high-rating">High rating</option>
        <option value="low-rating">Low rating</option>
      </select>
    </div>
    <div class="w-[100%] rounded-xl py-[10px] pt-[15px] font-istok hover:bg-gray-600 hover:bg-opacity-70"
      v-for="review in reviews" :key="review.id">
      <div class="flex flex-row gap-[15px] items-end pl-2 mb-10">
        <div class="flex flex-row itms-center">
          <img class="w-[60px] h-[60px] rounded-full" :src="review.imageUrl" />
          <p class="text-[32px] font-bold ml-3">{{ review.username }}</p>
          <div class="flex flex-col gap-[15px]">
            <div class="flex w-[full] h-[full] ml-3 p-3 pr-5 pb-5 bg-gray-600 bg-opacity-20 rounded-xl">
              <RatingBar :rating="[
                review.rating.entertainment,
                review.rating.movie_Chapter,
                review.rating.performance,
                review.rating.production,
                review.rating.worthiness,
              ]" :format="'comment'" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="w-[100%] mb-[15px] ml-6">
          <div class="flex items-end h-full gap-4">
            <img class="w-[40px] h-[40px] rounded-full" :src="review.imageUrl" />
            <div class="flex chat chat-start">
              <div class="chat-bubble">{{ review.comment }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center justify-end gap-[5px] mr-3">
        <span class="mt-1">Liked {{ review.likeCount ? review.likeCount : '0' }}</span>
        <svg width="23" height="23" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"
          @click="$emit('toggleStatusLike', review)" :fill="toggleColor[review.id] && userStore.checkUserLoggedIn()
            ? 'red'
            : 'none'
            " class="cursor-pointer hover:opacity-50">
          <g clip-path="url(#clip0_90_683)">
            <path
              d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
</template>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(90deg, #c60000 0%, #600000 100%);
}
</style>
