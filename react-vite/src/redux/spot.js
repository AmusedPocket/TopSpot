import { normalizeData, errorHandler } from "./store"

const GET_SPOT = "spot/GET_SPOT"
const GET_ALL_SPOTS = "spot/GET_ALL_SPOTS"
const CREATE_SPOT = "spot/CREATE_SPOT"
const UPDATE_SPOT = "spot/UPDATE_SPOT"
const DELETE_SPOT = "spot/DELETE_SPOT"

const _getSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

const _getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

const _createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

const _updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const _deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const thunkGetSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);

    if(!response.ok) return await errorHandler(response);

    const {spot} = await response.json();

    dispatch(_getSpot(spot))

    return spot;
}

export const thunkGetAllSpots = (category = null) => async (dispatch) => {
    const response = await fetch(`/api/spots${category ? "?category=" + category : ""}`)

    if (!response.ok) return await errorHandler(response);

    const {spots} = await response.json()

    dispatch(_getAllSpots(spots))

    return spots;
}

export const thunkCreateSpot = (spotData) => async (dispatch) => {
    const response = await fetch(`/api/spots`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spotData)
    })

    if(!response.ok) return await errorHandler(response);

    const {spot} = await response.json()

    console.log("spot thunk is: ", spot)

    dispatch(_createSpot(spot));

    return spot;
}

export const thunkUpdateSpot = (spotData) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotData.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spotData)
    })

    if(!response.ok) return await errorHandler(response);

    const {spot} = await response.json();

    dispatch(_updateSpot(spot));

    return spot;
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })

    if(!response.ok) return await errorHandler(response);

    const {message} = response.json();

    dispatch(_deleteSpot(spotId))

    return message;
}

const initialState = { currSpot: {}, allSpots: {} };

const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SPOT: {
           const newState = normalizeData(state);

           newState.currSpot = normalizeData(action.spot);

           return newState;
        }

        case GET_ALL_SPOTS: {
            const newState = normalizeData(state);

            newState.allSpots = normalizeData(action.spots)

            return newState
        }

        case CREATE_SPOT: {
            const newState = normalizeData(state);
            
            newState.currSpot = normalizeData(action.spot)
        
            newState.allSpots[action.spot.id] = normalizeData(action.spot)
            
            
            return newState;
        }

        case UPDATE_SPOT: {
            const newState = normalizeData(state);
            
            newState.currSpot = normalizeData(action.spot)
            newState.allSpots[action.spot.id] = normalizeData(action.spot)

            return newState;
        }

        case DELETE_SPOT: {
            const newState = normalizeData(state)

            newState.currSpot = {}

            delete newState.allSpots[action.spotId]

            return newState;
        }

        default:
            return state;
    }
}

export default spotReducer;