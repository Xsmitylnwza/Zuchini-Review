async function getMovies(url) {
  try {
    const data = await fetch(`${url}/movies`)
    const movies = await data.json()
    return movies
  } catch (error) {
    console.log(`error: ${error}`)
  }
}
async function getGenre(url) {
  try {
    const data = await fetch(`${url}/genres`)
    const genres = await data.json()
    return genres
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
    const data = await fetch(`${url}/reviews?movieId=${movieId}`)
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
async function getMoviesByName(movieName) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`
    const optionGetApi = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZmQ1ZWI0N2FhMTk3OWQ1ZjI3NWQzYzg3NjMwMCIsInN1YiI6IjY1ZWVjMjUxMmIxMTNkMDE3ZGY5Mjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1fR4x1gAywLqZIZBcaHET0fOF9DZTlawyjv446MzFe0',
      },
    }
    const data = await fetch(url, optionGetApi)
    const moviesSearched = await data.json()
    return moviesSearched
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

async function getReviews(userId) {
  try {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews${userId}`)
    const reviews = await data.json()
    return reviews
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

async function addReview(ratingScore, review, movieId, currentUserId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: currentUserId,
        movieId: movieId,
        rating: {
          entertainment: Number(ratingScore.entertainment),
          movie_Chapter: Number(ratingScore.movie_Chapter),
          performance: Number(ratingScore.performance),
          production: Number(ratingScore.production),
          worthiness: Number(ratingScore.worthiness),
        },
        comment: review,
        likeCount: 0,
      }),
    })
    return response
  } catch (e) {
    console.log(`error: ${e}`)
  }
}
async function editReview(review, ratingScore) {
  try {
    const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: review.userId,
        movieId: review.movieId,
        rating: {
          entertainment: Number(ratingScore.entertainment),
          movie_Chapter: Number(ratingScore.movie_Chapter),
          performance: Number(ratingScore.performance),
          production: Number(ratingScore.production),
          worthiness: Number(ratingScore.worthiness),
        },
        comment: review.comment,
        id: review.reviewId,
        likeCount: review.likeCount,
      }),
    })
    return response
  } catch (e) {
    console.log(`error: ${e}`)
  }


}

async function deleteReviewById(id) {
  try {
    const response = await fetch(import.meta.env.VITE_BASE_URL + '/reviews/' + id, {
      method: 'DELETE',
    })
    return response
  } catch (e) {
    console.log(`error: ${e}`)
  }
}

async function getReviewsAndUsers(reviewId, currentUser) {
  try {
    const [resReview, resUser] = await Promise.all([
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}`),
      fetch(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`),
    ]);
    const reviewUpdate = await resReview.json();
    const userData = await resUser.json();
    return { reviewUpdate, userData };
  } catch (e) {
    console.log(`error: ${e}`)
  }
}

async function updateReviewAndUser(reviewId, reviewUpdate, userDataUpdate, currentUser) {
  try {
    await Promise.all([
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewUpdate),
      }),
      fetch(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataUpdate),
      }),
    ]);
  } catch (e) {
    console.log(`error: ${e}`)
  }
}


export { getMovies, getGenre, getMoviesDetails, getMoviesReviews, getUsersInfo, getMoviesByName, getReviews, getReviewsAndUsers, updateReviewAndUser, addReview, editReview, deleteReviewById }
