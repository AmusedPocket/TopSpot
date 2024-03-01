import { errorHandler, normalizeData } from "./store";

const GET_REVIEW = "reviews/GET_REVIEW";
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const GET_ALL_USER_REVIEWS = "reviews/GET_ALL_USER_REVIEWS";
const GET_RANDOM_REVIEWS = "reviews/GET_RANDOM_REVIEWS"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const _getReview = (review) => ({
    type: GET_REVIEW,
    payload: review
})

const _getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
})

const _getUserReviews = (reviews) => ({
    type: GET_ALL_USER_REVIEWS,
    payload: reviews
})

const _getRandomReviews = (reviews) => ({
    type: GET_RANDOM_REVIEWS,
    payload: reviews
})

const _createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

const _updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

const _deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

export const thunkGetReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`)

    if(!response.ok) return await errorHandler(response);

    const {review} = await response.json();
    dispatch(_getReview(review));

    return review;
}

export const thunkGetAllReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`)

    if(!response.ok) return await errorHandler(response);

    const { reviews } = await response.json();

    dispatch(_getAllReviews(reviews));

    return reviews;
}

export const getUserReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/user/curr`)

    if(!response.ok) return await errorHandler(response);

    const {reviews} = await response.json();
    dispatch(_getUserReviews(reviews))

    return reviews;
}

export const getRandomReviews = (number) => async (dispatch) => {
    const response = await fetch(`/api/reviews/random/${number}`)

    if(!response.ok) return await errorHandler(response);

    const {reviews} = await response.json();
    dispatch(_getRandomReviews(reviews))

    return reviews;
}

export const createReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reviewData)
    })

    if(!response.ok) return await errorHandler(response);

    const {review} = await response.json()

    dispatch(_createReview(review))

    return review;
}

export const updateReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewData.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reviewData)
    })

    if(!response.ok) return await errorHandler(response);

    const {review} = await response.json();
    dispatch(_updateReview(review))

    return review;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if(!response.ok) return await errorHandler(response);

    const {message} = await response.json();
    dispatch(_deleteReview(reviewId));

    return message;
}

const initialState = {currReview: {}, allReviews: {}, userReviews: {}, randomReviews: {}}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            const newState = normalizeData(state)

            const newReview = normalizeData(action.review)

            newState.currReview = newReview

            newState.allReviews[action.review.id] = newReview

            return newState;
        }

        case GET_ALL_REVIEWS: {
            const newState = normalizeData(state);

            newState.userReviews = normalizeData(action.reviews)

            return newState;
        }

        case GET_RANDOM_REVIEWS: {
            const newState = normalizeData(state);

            newState.randomReviews = normalizeData(action.reviews)

            return newState;
        }

        case CREATE_REVIEW: {
            const newState = normalizeData(state)

            const newReview = normalizeData(action.review)

            newState.currReview = newReview;

            newState.allReviews[action.review.id] = newReview;
            newState.userReviews[action.review.id] = newReview;

            return newState;

        }

        case UPDATE_REVIEW: {
            const newState = normalizeData(state);

            newState.currReview = {};

            delete newState.allReviews[action.reviewid];
            delete newState.userReviews[action.reviewid];

            return newState;
        }

        default:
            return state;
    }
}

export default reviewReducer;
