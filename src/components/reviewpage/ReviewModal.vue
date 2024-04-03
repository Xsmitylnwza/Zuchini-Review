<script setup>
<<<<<<< HEAD
import ratingIcon from './ratingIcon.vue'
import { useUserStore } from '@/store/user'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RedBarTopic from '@/components/sharedcomponents/RedBarTopic.vue'
=======
import RatingIcon from "./RatingIcon.vue";
import { useUserStore } from "@/store/user";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RedBarTopic from "@/components/sharedcomponents/RedBarTopic.vue";
>>>>>>> 416ebd196d574e234cfb5ee162925a7898889787

defineEmits(['closeModal', 'updateReview'])

const props = defineProps({
  movieDetails: {
    type: Object,
  },
  reviewDetails: {
    type: Object,
    default: null,
  },
})
const route = useRoute()
const userStore = useUserStore()
const currentUserId = userStore.currentUser.id

const ratingScore = ref({
  entertainment: 50,
  movie_Chapter: 50,
  performance: 50,
  production: 50,
  worthiness: 50,
})
const review = ref('')

onMounted(() => {
  if (props.reviewDetails !== null) {
    ratingScore.value.performance = props.reviewDetails.rating.performance
    ratingScore.value.production = props.reviewDetails.rating.production
    ratingScore.value.movie_Chapter = props.reviewDetails.rating.movie_Chapter
    ratingScore.value.entertainment = props.reviewDetails.rating.entertainment
    ratingScore.value.worthiness = props.reviewDetails.rating.worthiness
    review.value = props.reviewDetails.comment
  }
})

const handleScoreChange = (key, event) => {
  ratingScore.value[key] = Number(event.target.value)
}
</script>

<template>
  <div class="bg-grey-500 backdrop-blur-sm w-screen h-screen fixed top-0 left-0 pt-[100px]">
    <div class="flex justify-center text-white font-semibold">
<<<<<<< HEAD
      <div
        class="bg-gradient-to-r from-black to-red-900 h-4/5 w-2/3 rounded-md p-4"
      >
        <div class="flex flex-row mx-8 my-2 w-11/12">
          <div class="flex w-full">
            <RedBarTopic :topic="reviewDetails ? 'Edit Review' : 'Review'" />
          </div>
          <div class="flex justify-end w-10/12 ml-6">
            <button
              class="flex items-center justify-center gap-[5px] w-[50px] h-[50px] text-[20px] rounded-full hover:opacity-90 bg-black hover:bg-red-700"
              @click="$emit('closeModal', false)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.21975 2.22C2.28932 2.15033 2.37194 2.09507 2.46288 2.05736C2.55382 2.01965 2.6513 2.00024 2.74975 2.00024C2.8482 2.00024 2.94569 2.01965 3.03663 2.05736C3.12757 2.09507 3.21019 2.15033 3.27975 2.22L5.99975 4.939L8.71975 2.22C8.78936 2.1504 8.87198 2.09519 8.96292 2.05752C9.05386 2.01985 9.15132 2.00047 9.24975 2.00047C9.34818 2.00047 9.44565 2.01985 9.53659 2.05752C9.62753 2.09519 9.71015 2.1504 9.77975 2.22C9.84935 2.2896 9.90457 2.37223 9.94223 2.46316C9.9799 2.5541 9.99929 2.65157 9.99929 2.75C9.99929 2.84843 9.9799 2.9459 9.94223 3.03683C9.90457 3.12777 9.84935 3.2104 9.77975 3.28L7.06075 6L9.77975 8.72C9.92032 8.86056 9.99929 9.05121 9.99929 9.25C9.99929 9.44879 9.92032 9.63943 9.77975 9.78C9.63919 9.92056 9.44854 9.99953 9.24975 9.99953C9.05097 9.99953 8.86032 9.92056 8.71975 9.78L5.99975 7.061L3.27975 9.78C3.13919 9.92056 2.94854 9.99953 2.74975 9.99953C2.55097 9.99953 2.36032 9.92056 2.21975 9.78C2.07919 9.63943 2.00022 9.44879 2.00022 9.25C2.00022 9.05121 2.07919 8.86056 2.21975 8.72L4.93875 6L2.21975 3.28C2.15009 3.21043 2.09482 3.12782 2.05712 3.03687C2.01941 2.94593 2 2.84845 2 2.75C2 2.65155 2.01941 2.55406 2.05712 2.46312C2.09482 2.37218 2.15009 2.28956 2.21975 2.22Z"
                  fill="#F8F8F8"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          class="relative bottom-[15px] flex justify-center items-center w-full"
        >
=======
      <div class="bg-gradient-to-r from-black to-red-900 h-4/5 w-2/3 rounded-md p-4">
        <div class="flex mx-8 my-2">
          <RedBarTopic :topic="reviewDetails ? 'Edit Review' : 'Review'" />
        </div>
        <div class="relative bottom-[15px] flex justify-center items-center w-full">
>>>>>>> 416ebd196d574e234cfb5ee162925a7898889787
          <div class="flex flex-col items-center w-[25%] my-8">
            <div>
              <img class="mb-[10px]" :src="'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path
            " width="150px" />
            </div>
            <div>
              {{ movieDetails.title }}
            </div>
          </div>
          <div class="flex w-[70%] gap-[55px]">
            <div>
              <RatingIcon />
            </div>
            <div>
<<<<<<< HEAD
              <div class="">
                <input
                  v-model="ratingScore.entertainment"
                  @input="handleScoreChange('entertainment', $event)"
                  id="performance"
                  type="range"
                  min="0"
                  max="100"
                  class="range range-error w-4/5 range-xs my-[9px] bg-black rounded-lg cursor-pointer mr-3 transition ease-in-out delay-150 hover:scale-105 duration-300"
                />
                {{ ratingScore.entertainment }} %
              </div>
              <input
                v-model="ratingScore.movie_Chapter"
                @input="handleScoreChange('movie_Chapter', $event)"
                id="production"
                type="range"
                min="0"
                max="100"
                class="range range-error w-4/5 range-xs my-[9px] bg-black rounded-lg cursor-pointer mr-3 transition ease-in-out delay-150 hover:scale-105 duration-300"
              />
              {{ ratingScore.movie_Chapter }} %
              <input
                v-model="ratingScore.performance"
                @input="handleScoreChange('performance', $event)"
                id="movie-chapter"
                type="range"
                min="0"
                max="100"
                class="range range-error w-4/5 range-xs my-[9px] bg-black rounded-lg cursor-pointer mr-3 transition ease-in-out delay-150 hover:scale-105 duration-300"
              />
              {{ ratingScore.performance }} %
              <input
                v-model="ratingScore.production"
                @input="handleScoreChange('production', $event)"
                id="entertainment"
                type="range"
                min="0"
                max="100"
                class="range range-error w-4/5 range-xs my-[9px] bg-black rounded-lg cursor-pointer mr-3 transition ease-in-out delay-150 hover:scale-105 duration-300"
              />
              {{ ratingScore.production }} %
              <input
                v-model="ratingScore.worthiness"
                @input="handleScoreChange('worthiness', $event)"
                id="worthiness"
                type="range"
                min="0"
                max="100"
                class="range range-error w-4/5 range-xs my-[9px] bg-black rounded-lg cursor-pointer mr-3 transition ease-in-out delay-150 hover:scale-105 duration-300"
              />
=======
              <input v-model="ratingScore.entertainment" @input="handleScoreChange('entertainment', $event)"
                id="performance" type="range" min="0" max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer" />
              {{ ratingScore.entertainment }} %
              <input v-model="ratingScore.movie_Chapter" @input="handleScoreChange('movie_Chapter', $event)"
                id="production" type="range" min="0" max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer" />
              {{ ratingScore.movie_Chapter }} %
              <input v-model="ratingScore.performance" @input="handleScoreChange('performance', $event)"
                id="movie-chapter" type="range" min="0" max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer" />
              {{ ratingScore.performance }} %
              <input v-model="ratingScore.production" @input="handleScoreChange('production', $event)"
                id="entertainment" type="range" min="0" max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer" />
              {{ ratingScore.production }} %
              <input v-model="ratingScore.worthiness" @input="handleScoreChange('worthiness', $event)" id="worthiness"
                type="range" min="0" max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer" />
>>>>>>> 416ebd196d574e234cfb5ee162925a7898889787
              {{ ratingScore.worthiness }} %
            </div>
          </div>
        </div>

        <div class="px-16 pb-2">
<<<<<<< HEAD
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-white rounded-lg bg-black shadow-sm shadow-red-500"
            placeholder="Write your review here..."
            v-model="review"
          ></textarea>
=======
          <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-white rounded-lg border bg-black"
            placeholder="Write your review here..." v-model="review"></textarea>
>>>>>>> 416ebd196d574e234cfb5ee162925a7898889787
        </div>

        <div class="flex justify-center gap-6 py-4 px-2">
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg"
            @click="
<<<<<<< HEAD
              $emit(
                'updateReview',
                ratingScore,
                review,
                route.params.id,
                currentUserId
              )
            "
          >
            {{ reviewDetails ? 'Edit' : 'Submit' }}
=======
            $emit(
              'updateReview',
              ratingScore,
              review,
              route.params.id,
              currentUserId
            )
            ">
            {{ reviewDetails ? "Edit" : "Submit" }}
          </button>
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg"
            @click="$emit('closeModal', false)">
            Close
>>>>>>> 416ebd196d574e234cfb5ee162925a7898889787
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(90deg, #c60000 0%, #600000 100%);
}
</style>
