<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { getMoviesByName, getGenre } from '@/libs/fetchUtils.js'

const userStore = useUserStore()
const currentUser = userStore.currentUser
const movieSearched = ref([])
const searchQuery = ref()
const genres = ref([])
const dataLoaded = ref(true)


onMounted(async () => {
  try {
    genres.value = await getGenre(import.meta.env.VITE_BASE_URL)
    dataLoaded.value = true
  } catch (error) {
    console.error(`${error}`)
  }
})

async function searchMovies() {
  const trimmedQuery = searchQuery.value.trim()
  const encodedQuery = trimmedQuery.replaceAll(' ', '%20')
  const movie = await getMoviesByName(encodeURIComponent(encodedQuery))
  movieSearched.value = movie
}

function refreshPage() {
  window.location.reload();
}

</script>

<template>
  <div
    class="sticky top-0 z-10 font-inter laptop:flex justify-between px-[40px] py-[10px] h-[120px] bg-gradient-to-b from-black via-black to-transparent">
    <div>
      <RouterLink to="/">
        <img src="/image/logo.png" class="w-[271px] h-[82px] hover:animate-rotate-y" />
      </RouterLink>
    </div>
    <div class="flex gap-[35px] items-center text-white font-semibold">
      <div>
        <div class="dropdown opacity-90 flex">
          <div class="relative">
            <input type="text" v-model="searchQuery" @input="searchMovies" placeholder="Search Movie here..."
              class="w-full pl-10 pr-4 py-2 rounded-2xl text-black focus:outline-none focus:border-red-500 opacity-50" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-6 h-6 opacity-70">
                <path fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <ul tabindex="0"
            class="dropdown-content flex flex-row z-[1] menu p-2 shadow rounded-box mt-12 overflow-y-auto max-h-96 bg-black">
            <li v-if="
              movieSearched &&
              movieSearched.results &&
              movieSearched.results.length > 0
            " v-for="movie in movieSearched.results" :key="movie.id" class="w-60 hover:text-red-500"
              @click="refreshPage">
              <router-link :to="'/movie/' + movie.id" @click.native="refreshPage">
                <img class="w-[70px] h-[100px] rounded-[5px]" :src="movie.poster_path
                  ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                  : '../icons/noimageavailable.png'
                  " />
                <h2>{{ movie.title }}</h2>
              </router-link>
            </li>
            <li v-else class="w-60">
              <h3>No result found</h3>
            </li>
          </ul>
        </div>
      </div>
      <button class="hover:opacity-80 btn btn-ghost rounded-btn">
        <RouterLink to="/">Home</RouterLink>
      </button>
      <div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost rounded-btn hover:opacity-90">
            Categories
          </div>
          <ul tabindex="0"
            class="menu dropdown-content z-[1] p-2 shadow bg-slate-950 rounded-box w-[500px] mt-2 overflow-y-auto max-h-80">
            <li v-for="genre in genres" :key="genre" class="movie-bg">
              <a :href="'http://localhost:5173/#' + genre.id">{{
                genre.name
              }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="userStore.checkUserLoggedIn()">
        <button class="hover:opacity-80 btn btn-ghost rounded-btn">
          <RouterLink to="/commented">Commented</RouterLink>
        </button>
      </div>
      <div>
        <div v-if="userStore.checkUserLoggedIn()" class="flex">
          <div class="flex items-center pr-3">{{ currentUser.username }}</div>
          <div class="dropdown dropdown-end">
            <img tabindex="0" role="button" class="btn btn-circle" :src="currentUser.imageUrl" />
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-black bg-opacity-75">
              <li>
                <RouterLink to="/edituserprofile"><a>
                    <div class="flex flex-col justify-center pt-5">
                      <div class="w-full justify-center flex">
                        <img :src="currentUser.imageUrl" class="w-[40%]" />
                      </div>
                      <div class="flex justify-center pt-3 pb-4">
                        {{ currentUser.username }}
                      </div>
                    </div>
                  </a></RouterLink>
              </li>
              <li>
                <RouterLink to="/edituserprofile">
                  <a>
                    <div class="flex items-center">
                      <img src="/icons/editProfile.png" class="w-full pr-4" />
                      <div>Editprofile</div>
                    </div>
                  </a>
                </RouterLink>
              </li>
              <li>
                <a>
                  <div class="flex items-center" @click="userStore.logout()">
                    <img src="/icons/logouticon.png" class="w-full pr-4" />
                    <div class="text-red-500">Logout</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <button class="hover:opacity-80">
            <RouterLink to="/register">Register</RouterLink>
          </button>
          |
          <button class="text-red-500 hover:opacity-90">
            <RouterLink to="/login">Login</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
