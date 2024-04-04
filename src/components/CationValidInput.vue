<script setup>
const props = defineProps({
  check: {
    type: Boolean,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
});
const cationIcon =
  "https://api.iconify.design/ep:warning-filled.svg?color=%23FF0000";
</script>

<template>
  <div
    v-show="!check"
    class="text-xs flex justify-start w-full text-white space-x-2 pt-1"
  >
    <img :src="cationIcon" />
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
</style>