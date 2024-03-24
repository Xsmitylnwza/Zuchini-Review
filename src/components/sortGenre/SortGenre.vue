<script setup>
import { RouterLink } from "vue-router"
import { ref, onMounted } from "vue"
import MovieBox from "./MovieBox.vue"
const prop = defineProps({
    dataMovies: {
        type: Array
    },
    GenreId: {
        type: String
    }
})
const DataGenreId = ref(prop.GenreId)
const dataLoaded = ref(false)
const DataMovies = ref(prop.dataMovies)
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
    const id = DataMovies.value.map((obj) => obj.genre_ids)
    for (let i = 0; i < DataMovies.value.length; i++) {
        if (id[i].includes(parseInt(DataGenreId.value))) {
            sortByCategory.value.push(DataMovies.value[i])
        }
    }
}
</script>

<template>
    <div class="bg-black">
        <div class="flex flex-row overflow-x-scroll overflow-y-clip gap-[20px]">
            <div v-for="movie in  sortByCategory " :key="movie.id"
                class="transition ease-in-out hover:-translate-y-1 hover:scale-110">
                <RouterLink :to="{ path: '/movie/' + movie.id }">
                    <MovieBox :movie="movie" />
                </RouterLink>

            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>