<script setup>
import { ref, onMounted } from "vue"
import SortGenre from "./SortGenre.vue"
const prop = defineProps({
    dataMovies: {
        type: Array,
        default: []
    }
});
onMounted(async () => {
    try {
        const responseGenres = await fetch(`http://localhost:5000/genres`)
        const dataGenres = await responseGenres.json()
        genres.value = dataGenres
        dataLoaded.value = true
    } catch (error) {
        console.error(error)
    }
});

const genres = ref([]);
const dataLoaded = ref(true);
const DataMovies = ref(prop.dataMovies);
</script>
<template>
    <div v-for="genre in genres" :key="genre" class="movie-bg">
        <h1 class="text-white font-semibold mb-[15px] text-3xl p-3">{{ genre.name }}</h1>
        <SortGenre v-if="dataLoaded" :dataMovies="DataMovies" :genreId="genre.id">
            <template> </template>
        </SortGenre>
    </div>
</template>
<style scoped>
.movie-bg {
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.85) 100%);
}
</style>