class ReviewManagement {
    constructor(previousReview = []) {
        this.reviews = previousReview

    }

    addReviews(reviews) {
        reviews.forEach((review) => this.addReview(review))
    }

    addReview(review) {
        this.reviews.push({ userId: review.userId, movieId: review.movieId, rating: review.rating, comment: review.comment, id: review.id, likeCount: review.likeCount })

    }
    sortReviewBy(sortBy) {
        console.log(sortBy)
        if (sortBy === 'most-liked') {
            this.reviews.sort((a, b) => b.likeCount - a.likeCount)
        }
        if (sortBy === 'high-rating') {
            this.reviews.sort((a, b) => {
                const ratingA = Object.values(a.rating).reduce((acc, cur) => acc + cur, 0);
                const ratingB = Object.values(b.rating).reduce((acc, cur) => acc + cur, 0);
                return ratingB - ratingA;
            })
        }
        if (sortBy === 'low-rating') {
            this.reviews.sort((a, b) => {
                const ratingA = Object.values(a.rating).reduce((acc, cur) => acc + cur, 0);
                const ratingB = Object.values(b.rating).reduce((acc, cur) => acc + cur, 0);
                return ratingA - ratingB;
            })
        }
    }
    incrementLike(reviewId) {
        this.reviews.map((review) => {
            if (review.id === reviewId) {
                console.log(reviewId)
                review.likeCount = review.likeCount + 1
                console.log(review.likeCount)
            }
        })
        console.log(this.reviews)
    }

    getReviews() {
        return this.reviews
    }


}

export { ReviewManagement }