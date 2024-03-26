async function getMovies(url) {
  try {
    const data = await fetch(`${url}/movies`)
    const movies = await data.json()
    return movies
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

async function getMoviesDetails(movieId, type) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}${type}?language=en-US`
    const optionGetApi = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZmQ1ZWI0N2FhMTk3OWQ1ZjI3NWQzYzg3NjMwMCIsInN1YiI6IjY1ZWVjMjUxMmIxMTNkMDE3ZGY5Mjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1fR4x1gAywLqZIZBcaHET0fOF9DZTlawyjv446MzFe0',
      },
    }
    const data = await fetch(url, optionGetApi)
    const moviesDetails = await data.json()
    return moviesDetails
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

async function getMoviesReviews(url, movieId) {
  try {
    const data = await fetch(`${url}/movies/${movieId}/?_embed=reviews`)
    const moviesReviews = await data.json()
    return moviesReviews
  } catch (error) {
    return { reviews: [] }
  }
}

async function getUsersInfo(userId) {
  try {
    const responseUser = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}`
    )
    const userInfo = await responseUser.json()
    return userInfo
  } catch (error) {
    console.log('YEAH man')
    console.log(`error: ${error}`)
  }
}

async function getReviews() {
  try {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`)
    const reviews = await data.json()
    console.log('reviews', reviews)
    return reviews
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

export {
  getMovies,
  getMoviesDetails,
  getMoviesReviews,
  getUsersInfo,
  getReviews,
}
