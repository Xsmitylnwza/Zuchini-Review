<script setup>
import RatingBar from '@/components/sharedcomponents/RatingBar.vue';
import { reactive } from 'vue';

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
    },
    currentUser: {
        type: Object
    }
});





</script>

<template>
    <div class="flex gap-[15px] mb-4">
        <div class="flex items-end">
            <img class="w-[75px] h-[50px] btn-circle" :src="currentUser.imageUrl" />
        </div>

        <div class="font-bold text-[22px] flex items-end">
            {{ currentUser.username }}
        </div>
        <div class="w-full flex flex-row">
            <div class="flex flex-col gap-[15px]">
                <div class="flex w-[full] h-[full] ml-3 p-3 pr-5 pb-5 bg-gray-600 bg-opacity-20 rounded-xl">
                    <RatingBar :rating="[
                        review.ratings.entertainment,
                        review.ratings.movie_Chapter,
                        review.ratings.performance,
                        review.ratings.production,
                        review.ratings.worthiness,
                    ]" :format="'comment'" />
                </div>
            </div>
        </div>
        <div class="flex gap-[10px] ml-[auto] items-start justify-start">
            <div @click="$emit('reviewModalHandler', true, index)" class="hover:text-gray-300">
                <button>Edit</button>
            </div>
            <div @click="$emit('deleteReview', review.id)" class="hover:text-red-500">
                <button>Delete</button>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-row">
        <div class="w-[100%] mb-[15px] ml-6">
            <div class="flex items-end h-full gap-4">
                <img class="w-[40px] h-[40px] rounded-full" :src="currentUser.imageUrl" />
                <div class="flex chat chat-start">
                    <div class="chat-bubble">{{ review.comment }}</div>
                </div>
            </div>

            <div class="flex gap-[10px] mt-[auto] ml-[auto] justify-end">
                <div>Liked {{ review.likeCount }}</div>
                <div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_90_1697)">
                            <path
                                d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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