import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import {
  GET_BLOG_POST,
  GET_BLOG_POSTS,
  GET_BLOG_POST_IMAGE,
} from '../actionTypes';

export interface InitialState {
  app: object[];
  posts: object[];
  post: object[];
  postImg: object[];
  loading: boolean;
  error: object;
}

export const initialState = {
  app: null,
  posts: [],
  post: null,
  postImg: null,
  loading: true,
  error: {},
};

let postsReducer: object;

postsReducer = (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case HYDRATE:
      if (payload.app === 'init') delete payload.app;
      if (payload.page === 'init') delete payload.page;
      return {
        ...state,
        app: payload,
      };
    case GET_BLOG_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_BLOG_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_BLOG_POST_IMAGE:
      return {
        ...state,
        postImg: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postsReducer;
