import supabase from "./supabase";

async function getMoviesFromApi(page) {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM3ZmQ1ZWI0N2FhMTk3OWQ1ZjI3NWQzYzg3NjMwMCIsIm5iZiI6MTcyMDUxMzEyNC4wNzgwNzYsInN1YiI6IjY1ZWVjMjUxMmIxMTNkMDE3ZGY5Mjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qF77zWyt6MZLHXfHFB-_Odzoblrb9PmKJBbOPxDE2g4'
    }
  };

  const data = await fetch(url, options)
  const movies = await data.json()
  return movies

}


export async function getGenre() {
  let { data: genres, error } = await supabase
    .from('genres')
    .select('id::text, *')  // Cast id to string

  // Error handler
  if (error) throw new Error("Genres could not be loaded");

  return genres;
}

export async function getMoviesDetails(movieId, type) {
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

export async function getMoviesReviews(movieId) {
  let { data: reviews, error } = await supabase
    .from('reviews')
    // QUERY DATA FROM FORIGN KEY
    .select("*, ratings(*)")
    .eq('movieId', movieId)
    .order('id', { ascending: true })


  // Error handler
  if (error) throw new Error("Reviews could not be loaded");

  return reviews

}

export async function getMoviesByName(movieName) {
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
export async function getUsers() {

  const { data: users, error } = await supabase
    .from('users')
    .select('*')

  if (error) throw new Error("Users could not be loaded")

  return users
}

export async function getUserByUserId(userId) {

  const { data: users, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  // Error handler
  if (userError) throw new Error("Users could not be loaded")


  let { data: likedcomments, error: likedError } = await supabase
    .from('likedcomments')
    .select('*')


  // Error handler
  if (likedError) throw new Error("likedComments could not be download")
  const likedComments = []
  likedcomments.forEach((likedComment) => {
    likedComments.push(likedComment.reviewId)
  })

  users.likedComments = likedComments



  return users

}

export async function getReviewByReviewId(reviewId) {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', reviewId)
    .select("*, ratings(*)")
    .single()


  // Error handler
  if (error) throw new Error("Reviews could not be loaded");

  return reviews
}
export async function getReviewsByMovieId(movieId) {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('movieId', movieId)
    .select("*, ratings(*)")
    .order('id', { ascending: true })



  // Error handler
  if (error) throw new Error("Reviews could not be loaded");
  return reviews
}

export async function getReviewsByUserId(userId) {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('userId', userId)
    .select("*, ratings(*)")
    .order('id', { ascending: true })



  // Error handler
  if (error) throw new Error("Reviews could not be loaded");
  return reviews
}
export async function addRating(ratingScore) {
  const { data: rating, error: ratingError } = await supabase.from('ratings')
    .insert([
      {
        ...ratingScore
      }
    ])
    .select().single()

  if (ratingError) throw new Error("Ratings could not be insert")


  return rating
}

export async function addReview(ratingScore, comment, movieId, currentUserId) {
  // CREATE RATINGS
  const rating = await addRating(ratingScore)

  // CREATE REVIEW
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        userId: currentUserId,
        movieId: movieId,
        comment: comment,
        likeCount: 0,
        ratingId: rating.id
      },
    ])
    .select()

  if (error) throw new Error("Review could not be insert")

  return data

}
export async function editRating(ratingId, ratingScore) {
  const { data, error } = await supabase
    .from('ratings')
    .update({ ...ratingScore })
    .eq('id', ratingId)
    .select()
    .single()

  if (error) throw new Error("Rating could not be edit")

  return data

}

export async function editReview(review, ratingScore) {
  const rating = await editRating(review.ratingId, ratingScore)
  if (!rating) return

  const { data, error } = await supabase
    .from('reviews')
    .update({ comment: review.comment })
    .eq('id', review.id)
    .select()
    .single()


  if (error) throw new Error("Review could not edit")

  return { rating, data }


}

export async function deleteReviewById(id) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) throw new Error("Review could not be delete")
}

export async function updateReviewAndUser(reviewId, reviewUpdate, userDataUpdate, currentUser, config) {
  try {
    const promises = [
      // Update the review
      supabase
        .from('reviews')
        .update(reviewUpdate)
        .eq('id', reviewId)
    ];

    if (config === "increment") {
      // Insert a new liked comment
      promises.push(
        supabase
          .from('likedcomments')
          .insert(userDataUpdate)
      );
    } else if (config === "decrement") {
      // Delete the liked comment
      promises.push(
        supabase
          .from('likedcomments')
          .delete()
          .match({ userId: currentUser.id, reviewId: reviewId })
      );
    }

    await Promise.all(promises);
  } catch (e) {
    console.log(`error: ${e}`);
  }

}
export async function updateUser(userDataUpdate, currentUser) {
  // const imageNmae = `${Math.random()}-${newCabin.image.name}`.replaceAll(
  //   "/",
  //   ""
  // );

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageNmae}`;

  const { data, error } = await supabase
    .from('users')
    .update({ ...userDataUpdate })
    .eq('id', currentUser.id)
    .select()

  if (error) throw new Error("User could not be update")

  console.log(data);

  return data;

}


export { getMoviesFromApi }
