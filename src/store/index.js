import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import baseReducer from "../reducers/index";
import getAll from "../reducers/FetchProfiles";
import profileData from "../reducers/profiledata";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  registerWorker: "",
  allAplication: [],
  profile: [],
};
const bigReducer = combineReducers({
  registerWorker: baseReducer,
  allAplication: getAll,
  profile: profileData,
});

export default function configureStore() {
  return createStore(
    bigReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
