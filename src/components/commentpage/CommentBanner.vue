<script setup>
const props = defineProps({
    movie: {
        type: Object,
        default: null
    }
});



</script>

<template>
    <div class="text-[22px] mb-[20px] font-semibold">
        {{ movie.title }}
    </div>
    <img class="w-[150px] h-[220px]" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
</template>

<style scoped></style>