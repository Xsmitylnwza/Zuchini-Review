<script setup>
import reviewIconZucchini from '/image/review-icon/zucchini.png';
import reviewIconCamera from '/image/review-icon/camera.png';
import reviewIconCinema from '/image/review-icon/cinema.png';
import reviewIconChapter from '/image/review-icon/chapter.png';
import reviewIconWatching from '/image/review-icon/watching.png';
import reviewIconMoney from '/image/review-icon/money.png';

const reviewItems = [
    { icon: reviewIconCamera, value: 84 },
    { icon: reviewIconCinema, value: 84 },
    { icon: reviewIconChapter, value: 84 },
    { icon: reviewIconWatching, value: 84 },
    { icon: reviewIconMoney, value: 84 },
];
</script>

<template>
    <div class="flex text-sm">
        <div class="flex items-center">
            <div class="flex mb-3 mt-3">
                <img :src="reviewIconZucchini" width="35px" height="35px" class="ml-1 mr-1"/>
                84%
            </div>
        </div>

        </div>
        <div v-for="item in reviewItems" :key="item.value" class="text-sm">
            <div class="flex">
                <img :src="item.icon" width="20px" height="20px" class="m-1"/>
            {{ item.value }}%
            </div>
        </div>
    
</template>

<style scoped></style>
