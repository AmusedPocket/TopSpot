import { errorHandler, normalizeData } from "./store";

const GET_REVIEW_IMAGE = "images/GET_REVIEW_IMAGE"
const GET_ALL_REVIEW_IMAGES = "images/GET_ALL_REVIEW_IMAGES"
const GET_USER_REVIEW_IMAGES = "images/GET_USER_REVIEW_IMAGES"
const UPLOAD_REVIEW_IMAGE = "images/UPLOAD_REVIEW_IMAGE"
const DELETE_REVIEW_IMAGE = "images/DELETE_REVIEW_IMAGE"

const _getReviewImage = (reviewImage) => ({
    type: GET_REVIEW_IMAGE,
    reviewImage
})

const _getAllReviewImages = (reviewImages) => ({
    type: GET_ALL_REVIEW_IMAGES,
    reviewImages
}
)
const _getUserReviewImages = (reviewImages) => ({
    type: GET_USER_REVIEW_IMAGES,
    reviewImages
})

const _uploadReviewImage = (reviewImage) => ({
    type: UPLOAD_REVIEW_IMAGE,
    reviewImage
})

const _deleteReviewImage = (reviewImageId) => ({
    type: DELETE_REVIEW_IMAGE,
    reviewImageId
})

export const thunkGetReviewImage = (reviewImageId) => async (dispatch) => {
    const response = await fetch(`/api/reviewimages/${reviewImageId}`);

    if(!response.ok) return await errorHandler(response);

    const {reviewImage} = await response.json()

    dispatch(_getReviewImage(reviewImage));

    return reviewImage;
}

export const thunkGetAllReviewImages = () => async (dispatch) => {
    const response = await fetch(`/api/reviewimages`);

    if(!response.ok) return await errorHandler(response);

    const {reviewImages} = await response.json();

    dispatch(_getAllReviewImages(reviewImages));

    return reviewImages;
}

export const thunkUploadReviewImage = (reviewImageData) => async (dispatch) => {
    const response = await fetch(`/api/reviewimages`, {
        method: "POST",
        body: reviewImageData
    })

    if(!response.ok) return await errorHandler(response);

    const {reviewImage} = await response.json();
    dispatch(_uploadReviewImage(reviewImage));

    return reviewImage;
}

export const thunkDeleteReviewImage = (reviewImageId) => async (dispatch) => {
    const response = await fetch(`/api/reviewimages/${reviewImageId}`, {
        method: "DELETE"
    })

    if(!response.ok) return await errorHandler(response);

    const {message} = await response.json()

    dispatch(_deleteReviewImage(reviewImageId))

    return message;
}

export const thunkGetUserReviewImages = () => async (dispatch) => {
    const response = await fetch(`/api/reviewimages/curr`);
    if(!response.ok) return await errorHandler(response);

    const {userImages} = await response.json()

    dispatch(_getUserReviewImages(userImages))

    return userImages;
}

const initialState = { currReviewImage: {}, allReviewImages: {}, userReviewImages: {}}

const reviewImageReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEW_IMAGE: {
            const newState = normalizeData(state);

            newState.currReviewImage = normalizeData(action.reviewImage)

            return newState;
        }

        case GET_ALL_REVIEW_IMAGES: {
            const newState = normalizeData(state);

            newState.allReviewImages = normalizeData(action.reviewImages)

            return newState;
        }

        case GET_USER_REVIEW_IMAGES: {
            const newState = normalizeData(state)

            newState.userReviewImages = normalizeData(action.reviewImages)

            return newState;
        }

        case UPLOAD_REVIEW_IMAGE: {
            const newState = normalizeData(state)

            newState.currReviewImage = normalizeData(action.reviewImage)
            newState.allReviewImages[action.reviewImage.id] = normalizeData(action.reviewImage)
            newState.userReviewImages[action.reviewImage.id] = normalizeData(action.reveiwImage)
            return newState
        }

        case DELETE_REVIEW_IMAGE: {
            const newState = normalizeData(state)

            delete newState.userReviewImages[action.reviewImageId]
            delete newState.allReviewImages[action.reviewImageId]

            return newState;
        }

        default:
            return state;
    }
}

export default reviewImageReducer;