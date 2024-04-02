<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import MovieBox from './MovieBox.vue'
const prop = defineProps({
    dataMovies: {
        type: Array,
    },
    genreId: {
        type: String,
    },
})
const dataGenreId = ref(prop.genreId)
const dataMovies = ref(prop.dataMovies)
const dataLoaded = ref(false)
const containerRef = ref(null);
const sortByCategory = ref([])
onMounted(async () => {
    try {
        sortGenres()
        dataLoaded.value = true
    } catch (error) {
        console.error(error)
    }
})
function sortGenres() {
    sortByCategory.value = []
    const id = dataMovies.value.map((obj) => obj.genre_ids)
    for (let i = 0; i < dataMovies.value.length; i++) {
        if (id[i].includes(parseInt(dataGenreId.value))) {
            sortByCategory.value.push(dataMovies.value[i])
        }
    }
}


function scrollLeft() {
    const container = containerRef.value
    const scrollAmount = 1000
    container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth',
    })
}

function scrollRight() {
    const container = containerRef.value
    const scrollAmount = 1000
    container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth',
    })
}
</script>

<template>
    <div class="bg-black">
        <div ref="containerRef"
            class="flex flex-row items-center overflow-x-scroll overflow-y-clip gap-[20px] h-[325px]">
            <div v-for="movie in sortByCategory" :key="movie.id"
                class="transition ease-in-out hover:-translate-y-1 hover:scale-105">
                <RouterLink :to="{ path: '/movie/' + movie.id }">
                    <MovieBox :movie="movie" />
                </RouterLink>
            </div>
        </div>
        <div class="w-full flex justify-between">
            <div class="relative flex items-center justify-center bottom-[200px] rounded-[10px] w-[55px] hover:opacity-85 cursor-pointer ml-2 transition ease-in-out delay-150 hover:scale-110 duration-300"
                @click="scrollLeft">
                <svg width="35" height="66" viewBox="0 0 35 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33 2L2 33L33 64" stroke="white" stroke-width="5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="relative flex items-center justify-center bottom-[200px] rounded-[10px] w-[55px] hover:opacity-85 cursor-pointer mr-2 transition ease-in-out delay-150 hover:scale-110 duration-300"
                @click="scrollRight">
                <svg width="35" height="66" viewBox="0 0 35 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L33 33L2 64" stroke="white" stroke-width="5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}

.btn-bg {
    background: rgb(255, 0, 0);
    background: linear-gradient(180deg,
            rgba(255, 0, 0, 1) 1%,
            rgba(131, 0, 0, 1) 53%,
            rgba(0, 0, 0, 1) 100%);
}
</style>
