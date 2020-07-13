import { combineReducers } from "redux";
import posts from "./reducers/articles";

let rootReducer: object;

rootReducer = combineReducers({
  posts: posts
});

export default rootReducer;
