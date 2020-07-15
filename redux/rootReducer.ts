import { combineReducers } from 'redux';
import posts from './reducers/articles';

export const rootReducer = combineReducers({
  posts: posts,
});
