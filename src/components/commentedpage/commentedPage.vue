<script setup>
import NavBar from '../Homepage/NavBar.vue'
import RedBar from '../descriptionpage/RedBar.vue'
import RatingIcon from '../commentedpage/RatingIcon.vue'
</script>

<template>
    
    <div class="bg-gradient-to-r from-black to-red-900 h-screen">
        <NavBar/>
        <!-- Reviewed -->
        <div class="w-3/4 m-[auto] font-inter text-white px-24 py-8 bg-black bg-opacity-35 rounded-md">
            <div class="flex pt-10 pb-10">
                <div class="mt-1">
                    <RedBar />
                </div>
                <div class=" font-semibold pr-2 pl-2">
                    <h1 class="text-2xl">Reviewed</h1>
                </div>
            </div>
            <!-- Movies -->
            <div>
                <div class="flex text-center">
                    <div class="w-1/5">
                        <h1>Avengers 2055</h1>
                    </div>
                    <div class="flex justify-between w-full">
                        <div class="flex">
                            <svg width="25" height="25" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="26.5" cy="26.5" r="26" fill="#900505" stroke="#FF0C0C"/>
                            </svg>
                            <p class=" mx-2">Username</p>
                        </div>
                        <button class="underline text-red-700">Edit</button>
                    </div>
                </div>
                <div class="flex h-[225px]">
                    <img class="w-[175px]" src="...">
                        <div class="p-8">
                            <RatingIcon />
                        </div>
                        <div class="w-2/3 p-10 pb-10">
                            It can be said thatno one prefers a life in darkness to a life with a bright future. Sometimes it is unavoidable that darkness comes into our lives, however,
                            we know that when tomorrow comes, all darkness will disappear. With the presence of daylight, we will gain hope and courage.
                        </div>
                </div>
            </div>
            <div class="flex justify-end w-full gap-2">
                <div>
                    Liked 888
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675q.9-1.138 1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025q.9 1.137 2.45 2.675T12 18.3m0-6.825"/></svg>
                </div>
            </div>
            <br>
            <hr>
        </div>
    </div>
</template>

<style scoped></style>
