import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotReducer from "./spot";
import reviewReducer from "./reviews";
import reviewImageReducer from "./review_images";
import followReducer from "./follows";



export const errorHandler = async (response) => {
  console.log("Response is: ", response)
  const errors = await response.json();
  return errors;
}

export const normalizeData = (data) => {
  switch (typeof data){
    case "object": {
      if (data === null) return null;

      switch(Array.isArray(data)) {
        case true:
          return data.reduce((acc, item) => {
            item = normalizeData(item);
            acc[item.id] = item;
            return acc;
          }, {});

          default:
            return Object.entries(data).reduce((acc, [key, val]) => {
              val = normalizeData(val);
              acc[key] = val
              return acc;
            }, {})
      }
    }
    case "undefined":
      return null;
    
    default:
      return data;
  }
}

const rootReducer = combineReducers({
  session: sessionReducer,
  spot: spotReducer,
  reviews: reviewReducer,
  reviewImages: reviewImageReducer,
  follows: followReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
