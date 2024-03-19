<script setup>
import { onMounted, ref } from "vue";
import RatingPage from "./RatingPage.vue";

const props = defineProps({
  reviews: {
    type: Object,
    default: null,
  },
});

const infoReviews = ref([]);

onMounted(async () => {
  for (let i = 0; i < props.reviews.length; i++) {
    const review = props.reviews[i];
    const responseUser = await fetch(
      `http://localhost:5000/users/${review.userId}`
    );
    const user = await responseUser.json();
    const { username, imageUrl } = user;
    const rating = review.rating;
    const comment = review.comment;
    const userReview = {
      username,
      rating,
      comment,
      imageUrl,
      numlike: localStorage.getItem(`like_${username}`) || 0,
    };
    infoReviews.value.push(userReview);
  }
});

const incrementLike = (review) => {
  review.numlike++;
  localStorage.setItem(`like_${review.username}`, review.numlike);
};
function getRatingScore(rating) {
  const { performance, production, movie_Chapter, entertainment, worthiness } =
    rating;
  const ratingScore = [
    performance,
    production,
    movie_Chapter,
    entertainment,
    worthiness,
  ];
  return ratingScore;
}
</script>

<template>
  <div class="w-[100%] border-y border-white py-[10px]" v-for="review in infoReviews">
    <div class="flex flex-row gap-[15px] items-center pl-2">
      <img class="w-[70px] rounded-full" :src="review.imageUrl" />
      <p class="text-[32px]">{{ review.username }}</p>
    </div>
    <div class="flex flex-row gap-[15px] w-[100%]">
      <div class="flex p-[15px] border-r border-gray-600 w-[32%]">
        <RatingPage :rating="getRatingScore(review.rating)" :format="'comment'" />
      </div>
      <div class="flex flex-col p-[20px] w-[70%]">
        <div class="w-[100%] mb-[15px]">
          {{ review.comment }}
        </div>
        <div class="flex flex-row gap-[5px] ml-[auto]">
          <span>Liked {{ review.numlike }}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="incrementLike(review)" class="cursor-pointer">
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
</template>

<style scoped></style>