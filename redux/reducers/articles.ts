import {
  GET_BLOG_POST,
  GET_BLOG_POSTS,
  GET_BLOG_POST_IMAGE
} from "../actionTypes";

interface InitialState {
  posts: Array<any>;
  post: Array<any>;
  postImg: Array<any>;
  loading: boolean;
  error: object;
}

const initialState = {
  posts: [],
  post: null,
  postImg: null,
  loading: true,
  error: {}
};

let postsReducer: object;

postsReducer = (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOG_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_BLOG_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case GET_BLOG_POST_IMAGE:
      return {
        ...state,
        postImg: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default postsReducer;
