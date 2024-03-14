<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import NavBar from '../Homepage/NavBar.vue';
import RedBar from './RedBar.vue';
import RatingPage from './RatingPage.vue';

const route = useRoute();
const movie = ref([]);
const infoDetails = ref([]);
const infoCredits = ref([]);




onMounted(async () => {
    try {
        const url = `https://api.themoviedb.org/3/movie${route.fullPath}?language=en-US`;
        const urlcredit = `https://api.themoviedb.org/3/movie${route.fullPath}/credits?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZmQ1ZWI0N2FhMTk3OWQ1ZjI3NWQzYzg3NjMwMCIsInN1YiI6IjY1ZWVjMjUxMmIxMTNkMDE3ZGY5Mjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1fR4x1gAywLqZIZBcaHET0fOF9DZTlawyjv446MzFe0'
            }
        };
        const response = await fetch('http://localhost:5000/movies?id=' + route.params.id);
        const responseInfo = await fetch(url, options);
        const responseCredit = await fetch(urlcredit, options);
        const data = await response.json();
        const dataInfo = await responseInfo.json();
        const dataCredit = await responseCredit.json();
        movie.value = data[0];
        infoDetails.value = dataInfo;
        infoCredits.value = dataCredit;
        console.log(movie.value)
        console.log(infoDetails.value)
        console.log(infoCredits.value)
    } catch (error) {
        console.error(error);
    }
});

function timeFormat() {
    const hours = Math.floor(infoDetails.value.runtime / 60)
    const remainminutes = infoDetails.value.runtime % 60
    return `${hours} hour ${remainminutes} minute`
}
function revenueFormat(money) {
    const million = Math.floor(money / 1000000)
    const remain = money % 1000000
    return `$${million}.${String(remain).substring(0, 2)} million`
}
</script>

<template>
    <div class="bg-cover w-[100%] h-[120vh] " :style="{ 'background-image': 'url(' + movie?.backdrop_path + ')' }">

        <NavBar />
        <div class="w-[75%] m-[auto] font-istok text-white px-[45px] py-[10px] blackBackground">
            <div class="text-[40px] font-bold">{{ infoDetails.title }}</div>
            <div class="flex justify-between mb-[20px]">
                <div class="w-[25%]">
                    <img class="w-[225px]" :src="'https://image.tmdb.org/t/p/w500/' + infoDetails.poster_path" />
                </div>
                <div>
                    <RedBar />
                </div>
                <div class=" w-[75%] ml-[8px] font-semibold">
                    <h1 class="text-[20px]">MOVIE INFO</h1>
                    <div>{{ infoDetails.overview }}</div>
                    <div>Genres: <span v-for="genere in infoDetails.genres">{{ genere.name }},&nbsp</span></div>
                    <div>Original Language: {{ infoDetails.original_language = "en" ? "English" : "IDK" }}</div>
                    <div>Director: <span v-for="crew in infoCredits.crew">{{ crew.job.includes("Director") ?
        crew.name + ','
        : ' ' }}</span>
                    </div>
                    <div>Producer: <span v-for="crew in infoCredits.crew">{{ crew.job.includes("Producer") ?
        crew.name + ','
        : ' ' }}</span>
                    </div>
                    <div>Release Data: {{ infoDetails.release_date }}</div>
                    <div>Budget: {{ revenueFormat(infoDetails.budget) }}</div>
                    <div>Box Office: {{ revenueFormat(infoDetails.revenue) }}</div>
                    <div>Runtime: {{ timeFormat() }}</div>
                </div>
            </div>
            <div class="Menu">
                <div class="Rating mb-[20px]">
                    <div class="flex flex-row items-center gap-[5px] mb-[15px]">
                        <RedBar />
                        <span class="text-[24px] font-bold">Rating</span>
                    </div>
                    <div class="pr-[30px]">
                        <RatingPage />
                    </div>

                </div>
                <div class="Review">
                    <div class="flex flex-row items-center gap-[5px]">
                        <RedBar />
                        <span class="text-[24px] font-bold">Review</span>
                    </div>
                    <div class="flex flex-col items-center p-[20px]">
                        <p class="mb-[15px]">Review form is here!! Check to Enter form</p>
                        <button
                            class="flex items-center justify-center gap-[5px] w-[193px] h-[58px] border border-white text-[20px] rounded-[23px] hover:opacity-70 gradient-background">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.83333 7.88235H17.1667M7.83333 12.5882H14.8333M19.5 2C20.4283 2 21.3185 2.37185 21.9749 3.03374C22.6313 3.69563 23 4.59335 23 5.52941V14.9412C23 15.8772 22.6313 16.775 21.9749 17.4368C21.3185 18.0987 20.4283 18.4706 19.5 18.4706H13.6667L7.83333 22V18.4706H5.5C4.57174 18.4706 3.6815 18.0987 3.02513 17.4368C2.36875 16.775 2 15.8772 2 14.9412V5.52941C2 4.59335 2.36875 3.69563 3.02513 3.03374C3.6815 2.37185 4.57174 2 5.5 2H19.5Z"
                                    stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            REVIEW
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-[100%]">
                <div class="w-[100%] border-y border-white py-[10px]">
                    <div class="flex flex-row gap-[15px]">
                        <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="26.5" cy="26.5" r="26" fill="#900505" stroke="#FF0C0C" />
                        </svg>
                        <p class="text-[32px]">MY MATE NATE</p>
                    </div>
                    <div class="flex flex-row gap-[15px]">
                        <div class="flex p-[15px] border-r border-gray-600">
                            <RatingPage />
                        </div>
                        <div class="flex flex-col p-[20px]">
                            <div class="w-[100%] mb-[15px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptatum,
                                illumvelit
                                necessitatibus distinctio sapiente pariatur mollitia perferendis dolorem quo autem?
                                Mollitia
                                exercitationem architecto at veritatis, laboriosam possimus incidunt saepe. Ipsum.
                            </div>
                            <div class="flex flex-row gap-[5px] ml-[auto]">
                                <span>Liked 999</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_90_683)">
                                        <path
                                            d="M5.625 3C3.34688 3 1.5 4.84688 1.5 7.125C1.5 11.25 6.375 15 9 15.8723C11.625 15 16.5 11.25 16.5 7.125C16.5 4.84688 14.6531 3 12.375 3C10.98 3 9.74625 3.69263 9 4.75275C8.61963 4.21095 8.11431 3.76878 7.52682 3.46368C6.93934 3.15858 6.28699 2.99953 5.625 3Z"
                                            stroke="white" stroke-width="4" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_90_683">
                                            <rect width="18" height="18" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gradient-background {
    background-image: linear-gradient(90deg, #C60000 0%, #600000 100%);
}

.blackBackground {
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 42%, rgba(0, 0, 0, 1) 100%);
}
</style>