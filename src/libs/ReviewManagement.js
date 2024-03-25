class ReviewManagement {
    constructor() {
        this.reviews = []
    }

    addReviews(reviews) {
        reviews.forEach((review) => this.addReview(review))
    }

    addReview(review) {
        // this.reviews.push({ userId: review.userId, movieId: review.movieId, rating: review.rating, comment: review.comment, id: review.id, likeCount: review.likeCount })
        this.reviews.push({ id: review.id, username: review.username, comment: review.comment, rating: review.rating, imageUrl: review.imageUrl, likeCount: review.likeCount, isLiked: review.isLiked })
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
    getAllResultRating() {
        const allReslutRating = this.getAllRating()
        return this.getResultRating(allReslutRating)
    }

    getResultRating(rating) {
        const resultRating = rating.reduce((sum, rating) => sum + rating, 0) / rating.length
        return resultRating.toFixed(2)
    }


    getAllRating() {
        if (this.reviews.length == 0) {
            return;
        } else {
            const performanceScore =
                this.reviews.reduce(
                    (sum, review) => sum + review.rating.performance,
                    0
                ) / this.reviews.length;
            const productionScore =
                this.reviews.reduce(
                    (sum, review) => sum + review.rating.production,
                    0
                ) / this.reviews.length;
            const movieChapterScore =
                this.reviews.reduce(
                    (sum, review) => sum + review.rating.movie_Chapter,
                    0
                ) / this.reviews.length;
            const entertainmentScore =
                this.reviews.reduce(
                    (sum, review) => sum + review.rating.entertainment,
                    0
                ) / this.reviews.length;
            const worthinessScore =
                this.reviews.reduce(
                    (sum, review) => sum + review.rating.worthiness,
                    0
                ) / this.reviews.length;
            return [
                performanceScore,
                productionScore,
                movieChapterScore,
                entertainmentScore,
                worthinessScore,
            ];
        }
    }
    getReviewByPage(currentPage = 1) {
        return this.reviews.slice(
            (currentPage - 1) * 3,
            currentPage * 3
        );
    }
    incrementLike(reviewId) {
        this.reviews.map((review) => {
            if (review.id === reviewId) {
                review.likeCount = review.likeCount + 1
            }
        })
    }

    getReviews() {
        return this.reviews
    }


}

export { ReviewManagement }