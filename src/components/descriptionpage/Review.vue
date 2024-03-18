<script setup>
import RatingPage from './RatingPage.vue';

const props = defineProps({
    reviews: {
        type: Object,
        default: null
    },
    like: {
        type: Number,
        default: 0
    }
});


function getRatingScore(data) {
    const { performance, production, movie_Chapter, entertainment, worthiness } = data.rating;
    const ratingScore = [performance, production, movie_Chapter, entertainment, worthiness];
    return ratingScore
}

</script>

<template>
    <div v-if="props.reviews.length == 0"
        class="w-[100%] h-[150px] border-y border-gray-400 py-[10px] flex justify-center">
        <div class="font-istok text-[24px] m-[auto]">We didn't have any review right now...</div>
    </div>
    <div v-else class="w-[100%] border-t border-gray-300 py-[20px]" v-for="review in reviews">
        <div class="flex flex-row gap-[15px]">
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26.5" cy="26.5" r="26" fill="#900505" stroke="#FF0C0C" />
            </svg>
            <p class="text-[32px]">MY MATE NATE</p>
        </div>
        <div class="flex flex-row w-[100%]">
            <div class="flex p-[15px] w-[32%] h-[220px]">
                <RatingPage :rating="getRatingScore(review)" :format="'comment'" />
            </div>
            <div class="flex flex-col p-[20px] w-[68%] mb-[10px] border-l border-gray-400">
                <div class="w-[100%] mb-[15px]">
                    {{ review.comment }}
                </div>
                <button class="flex flex-row gap-[5px] ml-[auto] mt-[auto]">
                    <p>Liked {{ like }}</p>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_90_683)">
                            <path
                                d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_90_683">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>