<script setup>
const props = defineProps({
    movie: {
        type: Object,
        default: null
    }
});



</script>

<template>
    <img class="w-[150px] h-[220px] mb-3" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path
        " />
    <div class="text-[22px] mb-[20px] font-semibold">
        {{ movie.title }}
    </div>
</template>

<style scoped></style>