<script setup>
import reviewIconZucchini from '/image/review-icon/zucchini.png';
import reviewIconCamera from '/image/review-icon/camera.png';
import reviewIconCinema from '/image/review-icon/cinema.png';
import reviewIconChapter from '/image/review-icon/chapter.png';
import reviewIconWatching from '/image/review-icon/watching.png';
import reviewIconMoney from '/image/review-icon/money.png';

const props = defineProps({
    rating: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
})

const reviewItems = [
    { icon: reviewIconCamera, label: 'Performance', value: props.rating[0] },
    { icon: reviewIconCinema, label: 'Production', value: props.rating[1] },
    { icon: reviewIconChapter, label: 'Movie Chapter', value: props.rating[2] },
    { icon: reviewIconWatching, label: 'Entertainment', value: props.rating[3] },
    { icon: reviewIconMoney, label: 'Worthiness', value: props.rating[4] },
];

function getOverAllScore() {
    const overAllScore = props.rating.reduce((sum, rating) => sum + rating, 0) / props.rating.length
    return overAllScore.toFixed(1)
}

</script>

<template>
    <div class="flex flex-row justify-between flex-wrap">
        <div class="flex flex-row items-center">
            <div class="flex flex-col items-center">
                <img :src="reviewIconZucchini" width="75px" height="75px" />
                <div class="flex flex-col">
                    <p class="mt-[10px] text-[20px]">Zucchinitor</p>
                    <p class="text-red-500 text-[10px] ml-[auto]">200
                        Reviews</p>
                </div>
            </div>
            <div>{{ getOverAllScore() }}%</div>
        </div>
        <div v-for="item in reviewItems" :key="item.label" class="flex flex-row items-center">
            <div class="flex flex-col items-center">
                <img :src="item.icon" width="50px" height="50px" />
                <p class="mt-[10px]">{{ item.label }}</p>
            </div>
            <div>{{ item.value }}%</div>
        </div>
    </div>
</template>

<style scoped></style>
