<script setup>
import NavBar from '../Homepage/NavBar.vue';

const props = defineProps({
    movie: String,
});

console.log(props)

</script>

<template>
    <div class="laptop:bg-cover h-[100vh] max-w-[100%]"
        :style="{ 'background-image': 'url(' + '/image/avenger.jpg' + ')' }">
        <NavBar />
    </div>
</template>

<style scoped></style>