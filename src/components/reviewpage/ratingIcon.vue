<script setup>
import reviewIconCamera from '/image/review-icon/camera.png'
import reviewIconCinema from '/image/review-icon/cinema.png'
import reviewIconChapter from '/image/review-icon/chapter.png'
import reviewIconWatching from '/image/review-icon/watching.png'
import reviewIconMoney from '/image/review-icon/money.png'

const reviewItems = [
  { icon: reviewIconCamera, description: 'Performance' },
  { icon: reviewIconCinema, description: 'Production' },
  { icon: reviewIconChapter, description: 'Movie Chapter' },
  { icon: reviewIconWatching, description: 'Entertainment' },
  { icon: reviewIconMoney, description: 'Worthiness' },
]
</script>

<template>
  <div v-for="item in reviewItems" :key="item.value" class="text-sm my-1.5">
    <div class="flex">
      <img :src="item.icon" width="20px" height="20px" class="m-1" />
      {{ item.description }}
    </div>
  </div>
</template>

<style scoped></style>
