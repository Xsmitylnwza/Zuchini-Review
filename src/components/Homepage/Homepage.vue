<script setup>



</script>

<template>
    <div class="laptop:bg-cover min-h-[100vh] max-w-[100%]" :style="{ 'background-image': 'url(/image/avenger.jpg)' }">
        <slot name="navBar"></slot>
        <div class="flex justify-center gap-[150px] overflow-hidden mt-[30px]">
            <slot name="moviePage"></slot>
        </div>
    </div>
</template>

<style scoped></style>