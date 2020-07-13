import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogPost } from "../../redux/actions/articles";

const Article = ({ match }) => {
  const dispatch = useDispatch();
  const blogPostId = match.params.id;
  //const blogPostImageId = 115;

  useEffect(() => {
    dispatch(getBlogPost(blogPostId));
    //dispatch(getBlogPostImage(blogPostImageId));
  }, [dispatch, blogPostId]);

  const post = useSelector(state => state.posts.post);
  //const postImage = useSelector(state => state.postImg);

  const createMarkup: any = markUp => {
    return { __html: markUp };
  };

  return !post ? (
    "Loading..."
  ) : (
    <Fragment>
      <section className="app-row pt-10 pb-10 pr-5 pl-5">
        <div className="container mx-auto">
          <h1 className="article-header text-5xl">{post.title.rendered}</h1>
          <div className="flex flex-wrap">
            <article className="w-full sm:w-full md:w-full lg:flex-1 xl:flex-1 text-left mt-10 sm:pr-0 md:pr-10">
              <div
                className="break-words"
                dangerouslySetInnerHTML={createMarkup(post.content.rendered)}
              ></div>
            </article>
            <aside className="w-full sm:w-1/2 md:w-1/3 lg:1/3 xl:1/3 text-left mt-10 pl-10 border-solid border-gray-400 border-l">
              <h1 className="text-3xl">...</h1>
            </aside>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Article;
