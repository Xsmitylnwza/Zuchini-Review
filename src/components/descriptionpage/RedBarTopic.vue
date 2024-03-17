<script setup>
const props = defineProps({
    topic: {
        type: String,
        default: 'Topic'
    },
    size: {
        type: String,
        default: 'medium'
    }
});


</script>

<template>
    <div class="flex flex-row items-center gap-[5px] mb-[10px]">
        <svg width="4" height="22" viewBox="0 0 4 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" x2="2" y2="22" stroke="#FF0606" stroke-width="4" />
        </svg>
        <span class="font-bold" :class="size">{{ topic }}</span>
    </div>
</template>

<style scoped>
.small {
    font-size: 18px;
}

.medium {
    font-size: 24px;
}

.large {
    font-size: 36px;
}
</style>