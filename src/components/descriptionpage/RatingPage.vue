<script setup>
import reviewIconZucchini from '/image/review-icon/zucchini.png'
import reviewIconCamera from '/image/review-icon/camera.png'
import reviewIconCinema from '/image/review-icon/cinema.png'
import reviewIconChapter from '/image/review-icon/chapter.png'
import reviewIconWatching from '/image/review-icon/watching.png'
import reviewIconMoney from '/image/review-icon/money.png'

const props = defineProps({
  rating: {
    type: Array,
    default: [0, 0, 0, 0, 0],
  },
  format: {
    type: String,
    default: 'rating',
  },
  reviewer: {
    type: Number,
    default: 0,
  },
})

const reviewItems = [
  { icon: reviewIconWatching, label: 'Entertainment' },
  { icon: reviewIconChapter, label: 'Movie Chapter' },
  { icon: reviewIconCamera, label: 'Performance' },
  { icon: reviewIconCinema, label: 'Production' },
  { icon: reviewIconMoney, label: 'Worthiness' },
]

function getOverAllScore() {
  const overAllScore =
    props.rating.reduce((sum, rating) => sum + rating, 0) / props.rating.length
  return overAllScore.toFixed(2)
}
</script>

<template>
  <div
    class="flex flex-row flex-wrap"
    :class="
      format === 'comment'
        ? 'w-[350px] gap-x-[20px]'
        : 'justify-between font-semibold'
    "
  >
    <div
      class="flex flex-row items-center transition ease-in-out delay-150 hover:scale-105 duration-300"
      :class="format === 'comment' ? 'w-[100%] ' : ''"
    >
      <div class="flex flex-col items-center ml-[auto]">
        <img
          :src="reviewIconZucchini"
          :class="format === 'comment' ? 'w-[50px]' : 'w-[75px]'"
        />
        <div class="flex flex-col ">
          <p class="mt-[10px] text-[20px] ">Zucchinitor</p>
          <p v-if="format !== 'comment'" class="text-red-500 text-[13px]">
            {{ reviewer }} Review
          </p>
        </div>
      </div>
      <div :class="format === 'comment' ? 'mr-[auto]' : ''">
        {{ getOverAllScore() }}%
      </div>
    </div>
    <div
      v-for="(item, index) in reviewItems"
      :key="item.label"
      class="flex flex-row items-center mb-[5px]"
      :class="format === 'comment' ? ' w-[95px]' : 'w-[140px]'"
    >
      <div class="flex flex-col items-center">
        <img
          :src="item.icon"
          :class="format === 'comment' ? 'w-[20px]' : 'w-[55px]'"
        />
        <p class="mt-[10px]" :class="format === 'comment' ? 'text-[10px]' : ''">
          {{ item.label }}
        </p>
      </div>
      <div class="ml-[auto]">{{ rating[index].toFixed(2) }}%</div>
    </div>
  </div>
</template>

<style scoped></style>
