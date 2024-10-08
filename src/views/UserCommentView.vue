<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import {
  getReviewsByUserId,
  getMoviesDetails,
  deleteReviewById,
} from "@/libs/fetchUtils";
import { editReview } from "@/libs/fetchUtils";
import NavBar from "../components/sharedcomponents/NavBar.vue";
import RedBarTopic from "@/components/sharedcomponents/RedBarTopic.vue";
import ReviewModal from "@/components/reviewpage/ReviewModal.vue";
import LoadingScreen from "@/components/sharedcomponents/LoadingScreen.vue";
import ListComment from "@/components/commentpage/ListComment.vue"
import CommentBanner from "@/components/commentpage/CommentBanner.vue"
import CommentDetail from "@/components/commentpage/CommentDetail.vue"
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const reviews = ref([]);
const movies = ref([]);
const selectedReview = ref("");
const isReviewModalOpen = ref(false);
const moviesDetails = ref(false);
const dataLoaded = ref(false);
const toast = useToast();

onMounted(async () => {
  if (currentUser.id == undefined) {
    alert("You need to login first !!!")
    router.push('/login')
  }
  reviews.value = await getReviewsByUserId(currentUser.id);
  const movieDetailsPromises = reviews.value.map(async (review) => {
    const movieDetails = await getMoviesDetails(review.movieId);
    return movieDetails;
  });
  movies.value = await Promise.all(movieDetailsPromises);
  moviesDetails.value = movies.value[0];
  selectedReview.value = reviews.value[0];
  dataLoaded.value = true;


});

async function deleteReview(id) {
  if (window.confirm("Are you sure to delete this review?")) {
    await deleteReviewById(id);
    reviews.value = reviews.value.filter((review, index) => {
      if (review.id === id) movies.value.splice(index, 1)
      return review.id !== id
    });

    toast.success("Delete review successfully !!!");

  }
}
async function updateNewReview(ratingScore, comment) {
  selectedReview.value.comment = comment;
  selectedReview.value.ratings = ratingScore;
  const { rating } = await editReview(
    selectedReview.value,
    selectedReview.value.ratings
  );

  reviews.value.forEach((review) => {
    if (review.id === selectedReview.value.id) {

      review.comment = comment;
      review.ratings = rating;
    }
  });

  toast.success("Update review successfully !!!");
  closeModal(false);
}

function reviewModalHandler(isOpen, index = 0) {
  moviesDetails.value = movies.value[index];
  selectedReview.value = reviews.value[index];
  isReviewModalOpen.value = isOpen;
}

function closeModal(isOpen) {
  isReviewModalOpen.value = isOpen;
}
</script>

<template>
  <loadingScreen v-if="!dataLoaded" />
  <div v-if="dataLoaded" class="bg-gradient-to-r from-black to-red-900 min-h-screen">
    <NavBar />

    <Teleport to="body">
      <div v-if="isReviewModalOpen">
        <ReviewModal :movieDetails="moviesDetails" :reviewDetails="selectedReview" @closeModal="closeModal"
          @updateReview="updateNewReview" />
      </div>
    </Teleport>

    <div class="w-[80%] m-[auto] font-istok text-white px-24 py-8 bg-black bg-opacity-35 rounded-md">
      <div class="mt-1">
        <RedBarTopic :topic="'Reviewed'" />
      </div>
      <ListComment v-if="reviews?.length !== 0" :items="reviews">
        <template #default="slotProps">
          <div
            class="w-[100%] h-[auto] min-h-[350px] flex mb-[30px] hover:bg-slate-700 hover:bg-opacity-35 p-3 rounded-xl">
            <div class="w-[25%] flex flex-col items-center">
              <CommentBanner :movie="movies[slotProps.key]" />
            </div>
            <div class="w-[75%]">
              <CommentDetail :review="slotProps.item" :index="slotProps.key" :currentUser="currentUser"
                @reviewModalHandler="reviewModalHandler" @deleteReview="deleteReview" />
            </div>
          </div>
        </template>
      </ListComment>
      <div v-else class="flex justify-center">
        <div class="text-[24px]">🚨You didn't have any review right now ...</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
