<script setup>
import RedBarTopic from "../sharedcomponents/RedBarTopic.vue";
defineEmits(["handleVideo"]);

const props = defineProps({
  movieDetails: {
    type: Object,
  },
  isPlayVideo: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="text-[40px] font-bold">{{ movieDetails.title }}</div>
  <div class="flex justify-between mb-[20px]">
    <div class="w-[22%] mr-[3%] flex flex-col items-center">
      <img
        class="w-[225px]"
        :src="'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path"
      />
      <label
        for="my_modal_7"
        class="btn font-bold text-[22px] mt-[10px] pt-[2px] text-white font-istok gradient-bg border hover:opacity-70"
        @click="$emit('handleVideo')"
        >Trailer</label
      >
      <input type="checkbox" id="my_modal_7" class="modal-toggle" />
      <div class="modal" role="dialog" @click="$emit('handleVideo')">
        <div
          class="modal-box min-w-[200px] max-w-[1024px] h-[600px] p-0 flex items-center justify-center gradient-bg"
        >
          <iframe
            v-if="isPlayVideo && movieDetails.trailer"
            class="w-[100%] h-[100%]"
            :src="
              'https://www.youtube.com/embed/' +
              movieDetails.trailer +
              '?stop=1'
            "
            frameborder=" 0"
            allowfullscreen
            autoplay
          ></iframe>
          <div v-else class="text-[50px] text-white relative font-bold">
            Trailer not found
          </div>
        </div>
        <label
          class="modal-backdrop border border-black"
          for="my_modal_7"
          @click="handleVideo"
        ></label>
      </div>
    </div>
    <div class="w-[75%] ml-[8px] font-semibold">
      <RedBarTopic :topic="'Movie info'" />
      <div class="mb-[5px] font-medium">{{ movieDetails.overview }}</div>
      <div class="flex flex-wrap gap-[8px] items-center mb-[7px]">
        <div
          class="py-[4px] px-[15px] border-white border-2 rounded-[10px]"
          v-for="genere in movieDetails.genres"
          :key="genere"
        >
          {{ genere.name }}
        </div>
      </div>
      <div>
        Original Language:
        <span class="font-medium">{{
          (movieDetails.original_language = "en" ? "English" : "")
        }}</span>
      </div>
      <div>
        Director:
        <span class="font-medium">{{ movieDetails.director }}</span>
      </div>
      <div>
        Producer:
        <span class="font-medium">{{ movieDetails.producer }}</span>
      </div>
      <div>
        Release Data:
        <span class="font-medium">{{ movieDetails.release_date }}</span>
      </div>
      <div>
        Budget:
        <span class="font-medium">{{ movieDetails.budget }}</span>
      </div>
      <div>
        Box Office:
        <span class="font-medium">{{ movieDetails.revenue }}</span>
      </div>
      <div>
        Runtime: <span class="font-medium"> {{ movieDetails.runtime }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-bg {
  background-image: linear-gradient(90deg, #c60000 0%, #600000 100%);
}
</style>
