import { normalizeData } from "./store";

const ADD_FOLLOW = "follows/ADD_FOLLOW";
const DELETE_FOLLOW = "follows/DELETE_FOLLOW";

const _addFollow = (current_user, user_to_follow) => ({
    type: ADD_FOLLOW,
    payload: { current_user, user_to_follow }
});

const _deleteFollow = (current_user, user_to_follow) => ({
    type: DELETE_FOLLOW,
    payload: { current_user, user_to_follow }
});

export const thunkFollow = (current_user, user_to_follow) => async (dispatch) => {
    const response = await fetch(`/api/follows/${user_to_follow.id}`, {
        method: "POST"
    });

    if (response.ok) {
        const follow = await response.json();
        if (follow.message === "Followed user") {
            return dispatch(_addFollow(current_user, user_to_follow));
        } else if (follow.message === "Unfollowed user") {
            return dispatch(_deleteFollow(current_user, user_to_follow));
        }
    }
};

const initialState = {
    currFollow: null,
    allFollows: {},
    userFollows: {},
    current_user: {
        id: null, // initialize with null or any default value
        follows: [] // initialize with an empty array
    }
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOLLOW: {
            const newState = { ...state };
            const normalizedFollow = normalizeData(action.payload.user_to_follow);
            newState.allFollows[normalizedFollow.id] = normalizedFollow;
            newState.userFollows[normalizedFollow.id] = normalizedFollow;
            newState.currFollow = normalizedFollow;

            // Update follows for the current user
            newState.current_user.follows.push(normalizedFollow.id);

            return newState;
        }
        case DELETE_FOLLOW: {
            const newState = { ...state };
            const { current_user, user_to_follow } = action.payload;

            // Remove the unfollowed user from follows for the current user
            newState.current_user.follows = newState.current_user.follows.filter(id => id !== user_to_follow.id);

            delete newState.allFollows[user_to_follow.id];
            delete newState.userFollows[user_to_follow.id];
            newState.currFollow = null;
            return newState;
        }
        default:
            return state;
    }
};

export default followReducer;
