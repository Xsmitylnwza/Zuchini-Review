<script setup>
import slots from "./slot.vue"
import db from "../../../../data/db.json"
import { ref } from "vue"
const genreIds = ref([])
import { FindByGenreIds } from "@/composable/sortByGenseId"
for (let i = 0; i < db.genres.length; i++) {
  genreIds.value.push(db.genres[i].id)
}
</script>

<template>
  <div>
    <slots v-for="genreId in genreIds" :key="genreId">
      <template :on-load="FindByGenreIds(genreId)" />
    </slots>
  </div>
</template>

<style scoped></style>
