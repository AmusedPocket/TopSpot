import { normalizeData, errorHandler } from "./store";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  user
})

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
    headers: {"Content-Type": "application/json"}
  });
  
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if(data.errors){
      return data.errors;
    }
  } else {
    return ["An error occured. Please try again."];
  }
};

export const thunkLogout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout");

  if(response.ok){
    dispatch(removeUser());
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if(data.errors){
      return data.errors
    }
  } else {
    return ["An error occured. Please try again."]
  }
};

export const thunkUpdateUser = (userData) => async (dispatch) => {
  const response = await fetch(`/api/user/curr`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)
  })

  if (response.ok){
    const data = await response.json();
    await dispatch(updateUser(data))
    return null;
  } else {
    const data = await response.json();
    if (data.errors){
      return data.errors;
    }
  }
}

export const deleteUser = () => async (dispatch) => {
  const response = await fetch(`/api/user/curr`, {
    method: "DELETE"
  })

  if(!response.ok) return await errorHandler(response);
  dispatch(removeUser());

  return null;
}



const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: normalizeData(action.payload) };
    case REMOVE_USER:
      return { user: null };
    case UPDATE_USER:
      return {user: normalizeData(action.user)}
    default:
      return state;
  }
}

export default sessionReducer;
