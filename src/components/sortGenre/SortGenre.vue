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
    <div class="bg-black">
        <div ref="containerRef" class="flex flex-row overflow-x-scroll overflow-y-clip gap-[20px] min-h-[292px]">
            <div v-for="movie in  sortByCategory " :key="movie.id"
                class="transition ease-in-out hover:-translate-y-1 hover:scale-110">
                <RouterLink :to="{ path: '/movie/' + movie.id }">
                    <MovieBox :movie="movie" />
                </RouterLink>
            </div>
        </div>
        <div class="w-full flex justify-between">
            <div class="relative flex items-center justify-center bottom-[200px] rounded-[10px] w-[55px] btn-bg hover:opacity-85 cursor-pointer"
                @click="scrollLeft">
                <button class=" text-white text-[36px]">&lt;</button>
            </div>
            <div class="relative flex items-center justify-center bottom-[200px] rounded-[10px] w-[55px] btn-bg hover:opacity-85  cursor-pointer"
                @click="scrollRight">
                <button class="text-white text-[36px]">&gt;</button>
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
    background: linear-gradient(180deg, rgba(255, 0, 0, 1) 1%, rgba(131, 0, 0, 1) 53%, rgba(0, 0, 0, 1) 100%);
}
</style>