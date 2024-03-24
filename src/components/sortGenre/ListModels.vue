<script setup>
import { ref, onMounted } from "vue"
import SortGenre from "./SortGenre.vue"
const prop = defineProps({
    dataMovies: {
        type: Array,
        default: []
    }
})
onMounted(async () => {
    try {
        const responseGenres = await fetch(`http://localhost:5000/genres`)
        const dataGenres = await responseGenres.json()
        genres.value = dataGenres
        dataLoaded.value = true
    } catch (error) {
        console.error(error)
    }
})

const genres = ref([])
const dataLoaded = ref(true)
const DataMovies = ref(prop.dataMovies)
</script>
<template>
    <div v-for="genre in genres" :key="genre" class="bg-black">
        <h1 class="text-white text-3xl p-3">{{ genre.name }}</h1>
        <SortGenre v-if="dataLoaded" :dataMovies="DataMovies" :GenreId="genre.id">
            <template> </template>
        </SortGenre>
    </div>
</template>
<style scoped></style>