<script setup>
import ratingIcon from "./ratingIcon.vue";
import { useUserStore } from "@/store/user";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RedBarTopic from "@/components/sharedcomponents/RedBarTopic.vue";

defineEmits(["closeModal", "updateReview"]);

const props = defineProps({
  movieDetails: {
    type: Object,
  },
  reviewDetails: {
    type: Object,
    default: null,
  },
});
const route = useRoute();
const userStore = useUserStore();
const currentUserId = userStore.currentUser.id;

const ratingScore = ref({
  entertainment: 50,
  movie_Chapter: 50,
  performance: 50,
  production: 50,
  worthiness: 50,
});
const review = ref("");

onMounted(() => {
  if (props.reviewDetails !== null) {
    ratingScore.value.performance = props.reviewDetails.rating.performance;
    ratingScore.value.production = props.reviewDetails.rating.production;
    ratingScore.value.movie_Chapter = props.reviewDetails.rating.movie_Chapter;
    ratingScore.value.entertainment = props.reviewDetails.rating.entertainment;
    ratingScore.value.worthiness = props.reviewDetails.rating.worthiness;
    review.value = props.reviewDetails.comment;
  }
});

const handleScoreChange = (key, event) => {
  ratingScore.value[key] = Number(event.target.value);
};
</script>

<template>
  <div
    class="bg-grey-500 backdrop-blur-sm w-screen h-screen fixed top-0 left-0 pt-[100px]"
  >
    <div class="flex justify-center text-white font-semibold">
      <div
        class="bg-gradient-to-r from-black to-red-900 h-4/5 w-2/3 rounded-md p-4"
      >
        <div class="flex mx-8 my-2">
          <RedBarTopic :topic="reviewDetails ? 'Edit Review' : 'Review'" />
        </div>
        <div
          class="relative bottom-[15px] flex justify-center items-center w-full"
        >
          <div class="flex flex-col items-center w-[25%] my-8">
            <div>
              <img
                class="mb-[10px]"
                :src="
                  'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path
                "
                width="150px"
              />
            </div>
            <div>
              {{ movieDetails.title }}
            </div>
          </div>
          <div class="flex w-[70%] gap-[55px]">
            <div>
              <ratingIcon />
            </div>
            <div>
              <input
                v-model="ratingScore.entertainment"
                @input="handleScoreChange('entertainment', $event)"
                id="performance"
                type="range"
                min="0"
                max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
              />
              {{ ratingScore.entertainment }} %
              <input
                v-model="ratingScore.movie_Chapter"
                @input="handleScoreChange('movie_Chapter', $event)"
                id="production"
                type="range"
                min="0"
                max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
              />
              {{ ratingScore.movie_Chapter }} %
              <input
                v-model="ratingScore.performance"
                @input="handleScoreChange('performance', $event)"
                id="movie-chapter"
                type="range"
                min="0"
                max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
              />
              {{ ratingScore.performance }} %
              <input
                v-model="ratingScore.production"
                @input="handleScoreChange('production', $event)"
                id="entertainment"
                type="range"
                min="0"
                max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
              />
              {{ ratingScore.production }} %
              <input
                v-model="ratingScore.worthiness"
                @input="handleScoreChange('worthiness', $event)"
                id="worthiness"
                type="range"
                min="0"
                max="100"
                class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
              />
              {{ ratingScore.worthiness }} %
            </div>
          </div>
        </div>

        <div class="px-16 pb-2">
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-white rounded-lg border bg-black"
            placeholder="Write your review here..."
            v-model="review"
          ></textarea>
        </div>

        <div class="flex justify-center gap-6 py-4 px-2">
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg"
            @click="
              $emit(
                'updateReview',
                ratingScore,
                review,
                route.params.id,
                currentUserId
              )
            "
          >
            {{ reviewDetails ? "Edit" : "Submit" }}
          </button>
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-bg"
            @click="$emit('closeModal', false)"
          >
            Close
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
