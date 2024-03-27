<script setup>
import router from '@/router'
import RedBar from '../commentedpage/RedBar.vue'
import ratingIcon from './ratingIcon.vue'
import { useUserStore } from '@/store/user'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMovies } from '@/libs/fetchUtils'
import NavBar from '../Homepage/NavBar.vue'

const route = useRoute()
const id = route.params.id

const performance_ratio = ref('50')
const chapter_ratio = ref('50')
const production_ratio = ref('50')
const entertainment_ratio = ref('50')
const worthiness_ratio = ref('50')
const review = ref('')
const movies = ref([])

const props = defineProps({
  movieName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  rating: {
    type: Object,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    default: true,
  },
  reviewId: {
    type: String,
    required: false,
  },
  likeCount: {
    type: Number,
    required: false,
  },
  movieId: {
    type: String,
    required: false,
  },
})

watch(
  () => props.open,
  (newProps) => {
    if (props.open) {
      performance_ratio.value = props.rating.performance
      chapter_ratio.value = props.rating.movie_Chapter
      production_ratio.value = props.rating.production
      entertainment_ratio.value = props.rating.entertainment
      worthiness_ratio.value = props.rating.worthiness
      review.value = props.review
    }
  }
)

const userStore = useUserStore()
const currentUserId = userStore.currnetUser.id

async function submitReview() {
  //แก้ไข
  if (!id) {
    await fetch(`http://localhost:5000/reviews/${props.reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUserId,
        movieId: props.movieId,
        rating: {
          performance: Number(performance_ratio.value),
          production: Number(production_ratio.value),
          movie_Chapter: Number(chapter_ratio.value),
          entertainment: Number(entertainment_ratio.value),
          worthiness: Number(worthiness_ratio.value),
        },
        comment: review.value,
        id: props.reviewId,
        likeCount: props.likeCount,
      }),
    })
  } else {
    //เพิ่ม
    await fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUserId,
        movieId: id,
        rating: {
          performance: Number(performance_ratio.value),
          production: Number(production_ratio.value),
          movie_Chapter: Number(chapter_ratio.value),
          entertainment: Number(entertainment_ratio.value),
          worthiness: Number(worthiness_ratio.value),
        },
        comment: review.value,
        id: crypto.randomUUID(),
        likeCount: 0,
      }),
    })
    alert('บันทึกสำเร็จ')
    router.replace(`/commented`)
    //go to review page
  }
}

onMounted(async () => {
  const response = await getMovies(import.meta.env.VITE_BASE_URL)
  console.log('🚀 ~ onMounted ~ response:', response)
  movies.value = response
})
</script>

<template>
  <NavBar v-if="id" />
  <div
    class="bg-grey-500 backdrop-blur-sm w-full h-full fixed top-0 left-0 py-[175px] overflow-x-hidden overflow-y-auto"
    v-show="props.open"
  >
    <!-- {{ movies }} -->
    <div class="flex justify-center text-white">
      <div
        class="bg-gradient-to-r from-black to-red-900 h-4/5 w-2/3 rounded-md p-4"
      >
        <div class="flex mx-8 my-2">
          <RedBar class="mt-1.5" />
          <div class="mx-2 font-semibold text-2xl">Review</div>
        </div>

        <div class="flex px-16 w-full gap-12 h-full">
          <div class="flex w-28 my-8">
            <img
              :src="
                props.image
                  ? props.image
                  : 'https://image.tmdb.org/t/p/w500/' +
                    movies.find((movie) => movie.id === id)?.poster_path
              "
              width="200px"
            />
          </div>

          <div class="">
            <ratingIcon />
          </div>
          <div class="">
            <input
              v-model="performance_ratio"
              id="performance"
              type="range"
              min="0"
              max="100"
              class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
            />
            {{ performance_ratio }} %
            <input
              v-model="production_ratio"
              id="production"
              type="range"
              min="0"
              max="100"
              class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
            />
            {{ production_ratio }} %
            <input
              v-model="chapter_ratio"
              id="movie-chapter"
              type="range"
              min="0"
              max="100"
              class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
            />
            {{ chapter_ratio }} %
            <input
              v-model="entertainment_ratio"
              id="entertainment"
              type="range"
              min="0"
              max="100"
              class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
            />
            {{ entertainment_ratio }} %
            <input
              v-model="worthiness_ratio"
              id="worthiness"
              type="range"
              min="0"
              max="100"
              class="w-4/5 h-3 my-3 bg-black rounded-lg appearance-none cursor-pointer"
            />
            {{ worthiness_ratio }} %
          </div>
        </div>
        <div class="px-16">{{ props.movieName }}</div>

        <div class="p-16 pb-2">
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
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background bg-red-900"
            @click="
              async () => {
                await submitReview()
                $emit('submitReview')
                $emit('close')
              }
            "
          >
            Submit
          </button>
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background bg-red-900"
            @click="
              () => {
                if (id) {
                  router.replace(`/`)
                }
                $emit('close')
              }
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
