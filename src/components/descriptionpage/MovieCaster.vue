<script setup>
import RedBarTopic from "../sharedcomponents/RedBarTopic.vue";

defineEmits(['handleShowAllCrew'])

const props = defineProps({
  movieCasters: {
    type: Object,
    default: null
  },
  isShowAllCrew: {
    type: Boolean,
    default: false
  }

});
</script>

<template>
  <RedBarTopic :topic="'Casts & Crews'" />
  <div class="flex flex-wrap justify-center gap-[20px] px-[60px]">
    <div class="w-[100px]" v-for="cast in movieCasters" :key="cast.id">
      <img class="rounded-[3px] mb-[5px]" width="100px" height="1px"
        :src="'https://image.tmdb.org/t/p/w500/' + cast.profile_path" />
      <a href="#" class="w-[50%] text-blue-500 hover:text-blue-600">{{
    cast.original_name
  }}</a>
      <div class="text-[14px]">{{ cast.character }}</div>
    </div>
  </div>
  <div class="my-[15px]">
    <div class="ml-[auto] w-[100px]">
      <button @click="$emit('handleShowAllCrew')">
        <span class="hover:text-gray-400">{{
    isShowAllCrew ? "Hide" : "Show All"
          }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>