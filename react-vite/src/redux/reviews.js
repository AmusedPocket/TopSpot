import { errorHandler, normalizeData } from "./store";

const GET_REVIEW = "reviews/GET_REVIEW";
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const GET_ALL_USER_REVIEWS = "reviews/GET_ALL_USER_REVIEWS";
const GET_RANDOM_REVIEWS = "reviews/GET_RANDOM_REVIEWS"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"
const ADD_LBULB = "reviews/ADD_LBLUB"
const DELETE_LBULB = "reviews/DELETE_LBULB"
const ADD_THUMB = "reviews/ADD_THUMB"
const DELETE_THUMB = "reviews/DELETE_THUMB"
const ADD_HEART = "reviews/ADD_HEART"
const DELETE_HEART = "reviews/DELETE_HEART"
const ADD_SAD = "reviews/ADD_SAD"
const DELETE_SAD = "reviews/DELETE_SAD"

const _getReview = (review) => ({
    type: GET_REVIEW,
    review
})

const _getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

const _getUserReviews = (reviews) => ({
    type: GET_ALL_USER_REVIEWS,
    reviews
})

const _getRandomReviews = (reviews) => ({
    type: GET_RANDOM_REVIEWS,
    reviews
})

const _createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const _updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

const _deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

const _addLbulb = (reviewId, current_user, review) => ({
    type: ADD_LBULB,
    payload: {reviewId, current_user, review}
})

const _deleteLbulb = (reviewId, current_user) => ({
    type: ADD_LBULB,
    payload: {reviewId, current_user}
})

const _addHeart = (reviewId, current_user, review) => ({
    type: ADD_HEART,
    payload: {reviewId, current_user, review}
})

const _deleteHeart = (reviewId, current_user) => ({
    type: DELETE_HEART,
    payload: {reviewId, current_user}
})

const _addSad = (reviewId, current_user, review) => ({
    type: ADD_SAD,
    payload: {reviewId, current_user, review}
})

const _deleteSad = (reviewId, current_user) => ({
    type: DELETE_SAD,
    payload: {reviewId, current_user}
})

const _addThumb = (reviewId, current_user, review) => ({
    type: ADD_THUMB,
    payload: {reviewId, current_user, review}
})

const _deleteThumb = (reviewId, current_user) => ({
    type: DELETE_THUMB,
    payload: {reviewId, current_user}
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

export const thunkGetUserReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/user/curr`)

    if(!response.ok) return await errorHandler(response);

    const data = await response.json();
    const reviews = data.reviews;
    dispatch(_getUserReviews(reviews))

    return reviews;
}

export const thunkGetRandomReviews = (number) => async (dispatch) => {
    const response = await fetch(`/api/reviews/random/${number}`)

    if(!response.ok) return await errorHandler(response);

    const {reviews} = await response.json();
    dispatch(_getRandomReviews(reviews))

    return reviews;
}

export const thunkCreateReview = (reviewData) => async (dispatch) => {
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

export const thunkUpdateReview = (reviewData) => async (dispatch) => {
    console.log("=========================1")
    console.log("review data is: ", reviewData)
    const response = await fetch(`/api/reviews/${reviewData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
    console.log("=========================2")
    console.log("response is: ", response)
    if(!response.ok) return await errorHandler(response);
    console.log("=========================3")
    const {review} = await response.json();
    console.log("=========================4")
    dispatch(_updateReview(review))

    return review;
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if(!response.ok) return await errorHandler(response);

    const {message} = await response.json();
    dispatch(_deleteReview(reviewId));

    return message;
}

export const thunkLbulb = (reviewId, current_user) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/lbulb`, {
        methods: "POST"
    })

    const review = await response.json()

    if(review.message === "added lbulb"){
        dispatch(_addLbulb(reviewId, current_user, review))
        return 1;
    } else if (review.message === "deleted lbulb"){
        dispatch(_deleteLbulb(reviewId, current_user))
        return -1;
    }
    return 0;
}

export const thunkThumb = (reviewId, current_user) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/thumb`, {
        methods: "POST"
    })

    const review = await response.json()

    if(review.message === "added thumb"){
        dispatch(_addThumb(reviewId, current_user, review))
        return 1;
    } else if (review.message === "deleted thumb"){
        dispatch(_deleteThumb(reviewId, current_user))
        return -1;
    }
    return 0;
}

export const thunkHeart = (reviewId, current_user) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/heart`, {
        methods: "POST"
    })

    const review = await response.json()

    if(review.message === "added heart"){
        dispatch(_addHeart(reviewId, current_user, review))
        return 1;
    } else if (review.message === "deleted heart"){
        dispatch(_deleteHeart(reviewId, current_user))
        return -1;
    }
    return 0;
}

export const thunkSad = (reviewId, current_user) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}/sad`, {
        methods: "POST"
    })

    const review = await response.json()

    if(review.message === "added sad"){
        dispatch(_addSad(reviewId, current_user, review))
        return 1;
    } else if (review.message === "deleted sad"){
        dispatch(_deleteSad(reviewId, current_user))
        return -1;
    }
    return 0;
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
            console.log("in update review")
            const newState = normalizeData(state);
            const newReview = normalizeData(action.review)
            newState.currReview = newReview;
            newState.allReviews[action.review.id] = newReview
            newState.userReviews[action.review.id] = newReview;
         

            return newState;
        }

        case GET_ALL_USER_REVIEWS: {
            const newState = normalizeData(state);
            newState.userReviews = normalizeData(action.reviews)
            return newState;
        }
        case ADD_LBULB:
            const newState = normalizeData(state);
            const newReview = normalizeData(action.review)
            newState.currReview = newReview;
            newState.allReviews[action.review.id] = newReview
            newState.userReviews[action.review.id] = newReview

            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
