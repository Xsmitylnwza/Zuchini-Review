<script setup>
const props = defineProps({
    movie: {
        type: Object,
        default: {}
    }
});

</script>

<template>
    <div class="flex flex-col w-[255px] h-[292px] bg-cover rounded-[8px] border border-red-700"
        :style="{ 'background-image': 'url(\'https://image.tmdb.org/t/p/w500/' + movie.poster_path + '\')' }">
        <div class=" h-[100%] relative">
            <div class="relative left-[70%] top-[70%]">
                <button
                    class="commenticon-bg rounded-full w-[68px] h-[68px] flex justify-center items-center p-2 :hover=bg-blue-800">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.22222 9.35294H20.7778M9.22222 15.2353H17.8889M23.6667 2C24.8159 2 25.9181 2.46481 26.7308 3.29218C27.5435 4.11954 28 5.24169 28 6.41176V18.1765C28 19.3465 27.5435 20.4687 26.7308 21.2961C25.9181 22.1234 24.8159 22.5882 23.6667 22.5882H16.4444L9.22222 27V22.5882H6.33333C5.18406 22.5882 4.08186 22.1234 3.2692 21.2961C2.45655 20.4687 2 19.3465 2 18.1765V6.41176C2 5.24169 2.45655 4.11954 3.2692 3.29218C4.08186 2.46481 5.18406 2 6.33333 2H23.6667Z"
                            stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="mt-[auto] w-[255px] h-[150px] ">
            <div class="flex flex-col moviedetail-bg px-[15px] pb-[10px] h-[100%]">
                <div class="mt-[auto]">
                    <div class="text-[22px] text-white font-bold text-nowrap overflow-hidden slide-right ">
                        <p class="w-[auto]">{{ movie.title }}</p>
                    </div>
                    <div class="flex flex-row justify-between mt-[10px]">
                        <svg width="56" height="35" viewBox="0 0 56 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="38.5" cy="17.5" r="17" fill="#A3A3A3" />
                            <circle cx="38.5" cy="17.5" r="17" fill="#5A0101" />
                            <circle cx="38.5" cy="17.5" r="17" stroke="#7A0101" />
                            <circle cx="29.5" cy="17.5" r="17" fill="#A3A3A3" />
                            <circle cx="29.5" cy="17.5" r="17" fill="#820000" />
                            <circle cx="29.5" cy="17.5" r="17" stroke="#B00000" />
                            <circle cx="17.5" cy="17.5" r="17" fill="#B20707" stroke="#FF0404" />
                        </svg>
                        <button class="text-white rounded-[7px] text-[15px] px-2 border-2 border-white">
                            icon of top review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.commenticon-bg {
    background: rgb(255, 0, 0);
    background: linear-gradient(110deg, rgba(255, 0, 0, 1) 0%, rgba(84, 0, 0, 1) 100%);
}

.moviedetail-bg {
    background: rgb(217, 217, 217);
    background: linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(0, 0, 0, 0.61) 18%, rgba(0, 0, 0, 1) 43%, rgba(0, 0, 0, 1) 100%);
}



div.slide-right:hover p {
    animation: 8s slide-right;
}

@keyframes slide-right {
    from {
        margin-left: 0%;
        width: 100%;
    }

    to {
        margin-left: -100%;
        width: 100%;
    }
}
</style>