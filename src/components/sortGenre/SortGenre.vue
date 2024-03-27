<script setup>
import { RouterLink } from "vue-router"
import { ref, onMounted } from "vue"
import MovieBox from "./MovieBox.vue"
const prop = defineProps({
    dataMovies: {
        type: Array
    },
    genreId: {
        type: String
    }
})
const dataGenreId = ref(prop.genreId)
const dataLoaded = ref(false)
const dataMovies = ref(prop.dataMovies)
const sortByCategory = ref([])
const isHover = ref(false)
onMounted(async () => {
    try {
        dataLoaded.value = true
        sortGenres()
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



const containerRef = ref(null);

function scrollLeft() {
    const container = containerRef.value;
    const scrollAmount = 1000;
    container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth'
    });
}
function scrollRight() {
    const container = containerRef.value;
    const scrollAmount = 1000;
    container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
    });
}
</script>

<template>
    <div class="bg-black px-[60px]">
        <div ref="containerRef" class="flex flex-row overflow-x-scroll overflow-y-clip gap-[20px]">
            <div v-for="movie in  sortByCategory " :key="movie.id"
                class="transition ease-in-out hover:-translate-y-1 hover:scale-110">
                <RouterLink :to="{ path: '/movie/' + movie.id }">
                    <MovieBox :movie="movie" />
                </RouterLink>
            </div>
        </div>
        <button class="slide-button left text-white" @click="scrollLeft">&lt;</button>
        <button class="slide-button right text-white" @click="scrollRight">&gt;</button>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>