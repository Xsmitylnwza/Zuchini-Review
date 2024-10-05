<script setup>
const props = defineProps({
    movie: {
        type: Object,
        required: true
    }
});




</script>

<template>
    <RouterLink :to="{ path: '/movie/' + movie.id }">
        <img class="w-[150px] h-[220px] mb-3 image-container " :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path
            " />
        <div class="text-[22px] mb-[20px] font-semibold w-[80%]">
            {{ movie.title }}
        </div>
    </RouterLink>
</template>

<style scoped>
.image-container {
    transition: transform 0.3s ease;
}

.image-container:hover {
    transform: scale(1.1);
}
</style>