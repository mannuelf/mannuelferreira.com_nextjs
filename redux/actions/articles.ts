import {
  GET_BLOG_POSTS,
  GET_BLOG_POST,
  GET_BLOG_POST_IMAGE
} from "../actionTypes";
import { THEMWEBS } from "../../config/themwebs";
import Axios from "axios";

export const getBlogPosts: any = () => async dispatch => {
  try {
    const { posts } = THEMWEBS.api;
    const results = await Axios.get(`${posts}/?per_page=9`);
    dispatch({
      type: GET_BLOG_POSTS,
      payload: results.data
    });
  } catch (e) {
    console.log(e.message);
    throw new Error("kablam!");
  }
};

export const getBlogPost: any = id => async dispatch => {
  try {
    const { posts } = THEMWEBS.api;
    const post = await Axios.get(`${posts}/${id}`);
    dispatch({
      type: GET_BLOG_POST,
      payload: post.data
    });
  } catch (e) {
    console.log(e);
    throw new Error("kablam!");
  }
};

export const getBlogPostImage: any = id => async dispatch => {
  try {
    const { media } = THEMWEBS.api;
    const results = await Axios.get(`${media}/${id}`);
    dispatch({
      type: GET_BLOG_POST_IMAGE,
      payload: results.data
    });
  } catch (e) {
    console.log(e);
  }
};
