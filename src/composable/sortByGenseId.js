import { ref } from "vue"
import db from "../../data/db.json"
const isShow = ref(true)
const sortByCategory = ref([])
const genreName = ref("")
function FindByGenreIds(Id) {
  const genre = db.genres.find((genre) => genre.id === Id)
  if (genre) {
    genreName.value = genre.name
  }
  sortByCategory.value = []
  const id = db.movies.map((obj) => obj.genre_ids)
  for (let i = 0; i < db.movies.length; i++) {
    if (id[i].includes(Id) === true) {
      sortByCategory.value.push(db.movies[i])
    }
  }
}
export { genreName,sortByCategory, isShow, FindByGenreIds }
