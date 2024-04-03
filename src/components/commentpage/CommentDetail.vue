<script setup>
import RatingBar from '../descriptionpage/RatingBar.vue';

defineEmits(["reviewModalHandler", "deleteReview"])

const props = defineProps({
    review: {
        type: Object,
        default: null,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

</script>

<template>
    <div class="flex items-center gap-[15px]">
        <div class="flex gap-[10px] ml-[auto]">
            <div @click="$emit('reviewModalHandler', true, index)" class="hover:text-gray-300">
                <button>Edit</button>
            </div>
            <div @click="$emit('deleteReview', review.id)" class="hover:text-gray-300">
                <button>Delete</button>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-row">
        <RatingBar :rating="[
                review.rating.entertainment,
                review.rating.movie_Chapter,
                review.rating.performance,
                review.rating.production,
                review.rating.worthiness,
            ]" :format="'comment'" />
        <div class="flex flex-col w-[100%] p-[15px]">
            <div class="">
                {{ review.comment }}
            </div>
            <div class="flex gap-[10px] mt-[auto] ml-[auto]">
                <div>Liked {{ review.likeCount }}</div>
                <div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_90_1697)">
                            <path
                                d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_90_1697">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>