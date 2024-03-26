<script setup>
import reviewIconZucchini from '/image/review-icon/zucchini.png'
import reviewIconCamera from '/image/review-icon/camera.png'
import reviewIconCinema from '/image/review-icon/cinema.png'
import reviewIconChapter from '/image/review-icon/chapter.png'
import reviewIconWatching from '/image/review-icon/watching.png'
import reviewIconMoney from '/image/review-icon/money.png'
import { watch, ref } from 'vue'

const props = defineProps({
  value1: {
    default: 0,
    type: Number,
  },
  value2: {
    default: 0,
    type: Number,
  },
  value3: {
    default: 0,
    type: Number,
  },
  value4: {
    default: 0,
    type: Number,
  },
  value5: {
    default: 0,
    type: Number,
  },
})

const reviewItems = ref([
  { icon: reviewIconCamera, value: props.value1 },
  { icon: reviewIconCinema, value: props.value2 },
  { icon: reviewIconChapter, value: props.value3 },
  { icon: reviewIconWatching, value: props.value4 },
  { icon: reviewIconMoney, value: props.value5 },
])

watch(
  () => props,
  (newProps) => {
    reviewItems.value = [
      { icon: reviewIconCamera, value: newProps.value1 },
      { icon: reviewIconCinema, value: newProps.value2 },
      { icon: reviewIconChapter, value: newProps.value3 },
      { icon: reviewIconWatching, value: newProps.value4 },
      { icon: reviewIconMoney, value: newProps.value5 },
    ]
  }
)
</script>

<template>
  <div class="flex text-sm">
    <div class="flex items-center">
      <div class="flex mb-3 mt-3">
        <img
          :src="reviewIconZucchini"
          width="35px"
          height="35px"
          class="ml-1 mr-1"
        />
        {{ reviewItems[3].value || 0 }} %
      </div>
    </div>
  </div>
  <div v-for="item in reviewItems" :key="item.value" class="text-sm">
    <div class="flex">
      <img :src="item.icon" width="20px" height="20px" class="m-1" />
      {{ item.value }}%
    </div>
  </div>
</template>

<style scoped></style>
