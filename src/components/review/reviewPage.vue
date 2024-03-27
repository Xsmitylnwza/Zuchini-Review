<script setup>
import RedBar from "../descriptionpage/RedBarTopic.vue";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-grey-500 backdrop-blur-sm w-full h-full fixed top-0 left-0 py-[175px] overflow-x-hidden overflow-y-auto"
    v-show="open"
  >
    <div class="flex justify-center text-white">
      <div
        class="bg-gradient-to-r from-black to-red-900 h-4/5 w-2/3 rounded-md p-4"
      >
        <slot />
        <div class="flex justify-center gap-6 py-4 px-2">
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background bg-red-900"
          >
            Submit
          </button>
          <button
            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background bg-red-900"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
