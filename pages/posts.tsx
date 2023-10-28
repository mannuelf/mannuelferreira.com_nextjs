import Container from "@components/container";
import MoreStories from "@components/more-stories";
import Layout from "@components/Layout/layout";
import { getAllPosts } from "@lib/api";
import PageTitle from "@components/page-title";
import { CMS_NAME, META_POSTS, TWITTER_CARD_POSTS, TWITTER_HANDLE } from "@shared/constants";
import MetaTags from "@components/meta-tags";

type Props = {
  allPosts: Post[];
};

const Posts = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <MetaTags
          ogDescription={META_POSTS}
          ogImage={TWITTER_CARD_POSTS}
          ogSiteName={CMS_NAME}
          ogTitle={"Posts"}
          ogTwitterCard="summary_large_image"
          ogTwitterCreator={TWITTER_HANDLE}
          ogTwitterImage={`${TWITTER_CARD_POSTS}?${Date.now()}`}
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterTitle={"Posts"}
          ogUrl="https://mannuelferreira.com/posts"
        />
        <Container>
          <PageTitle>Posts</PageTitle>
          <div className="pt-4 mt-8 mb-8 border-t">
            <p className="text-lg"></p>
          </div>
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Posts;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "author",
    "category",
    "coverImage",
    "date",
    "excerpt",
    "slug",
    "tags",
    "title",
  ]);

  return {
    props: { allPosts },
  };
};
