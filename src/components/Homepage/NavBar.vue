<script setup>
import { RouterLink, RouterView } from "vue-router";


</script>

<template>
    <div
        class="sticky top-0 z-10 font-inter laptop:flex justify-between px-[40px] py-[10px] h-[130px]  bg-gradient-to-b from-black via-black to-transparent">
        <div>
            <img src="/image/logo.png" class="w-[271px] h-[82px]" />
        </div>
        <div class="flex gap-[35px] items-start pt-[20px] text-white font-semibold">
            <div>
                <svg xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    class="w-6 h-6 opacity-70">
                    <path fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <button class="hover:opacity-80">
                <RouterLink to="/">Home</RouterLink>
            </button>
            <button class="hover:opacity-80">
                Categories
            </button>
            <div>
                <button class="hover:opacity-80">Register</button>
                |
                <button class="text-red-500 hover:opacity-90">Login</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>