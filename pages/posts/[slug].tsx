import matter from "gray-matter";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import Layout from "@components/Layout/layout";
import Container from "@components/container";
import MetaTags from "@components/meta-tags";
import PostHeader from "@components/post-header";
import PostTitle from "@components/post-title";
import { getAllPosts, getPostBySlug } from "@lib/posts";
import { CMS_NAME, SITE_URL, TWITTER_HANDLE } from "@shared/constants";

type Props = {
  post: Post;
  morePosts: Post[];
  preview?: boolean | undefined;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  const currentURL = `${SITE_URL}${router.asPath}`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const contents = String(children).replace(/\n$/, "");

      return !inline && match
        ? (
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {contents}
          </SyntaxHighlighter>
        )
        : (
          <code className={className} {...props}>
            {children}
          </code>
        );
    },
  };

  return (
    <Layout>
      <Container>
        {router.isFallback ? <PostTitle>Loading…</PostTitle> : (
          <>
            <article className="max-w-screen-md mx-auto mb-20">
              <MetaTags
                ogDescription={post.excerpt}
                ogImage={post.ogImage.url}
                ogSiteName={CMS_NAME}
                ogTitle={post.title}
                ogTwitterCard={"summary_large_image"}
                ogTwitterCreator={TWITTER_HANDLE}
                ogTwitterImage={`${post.ogImage.url}?${Date.now()}`}
                ogTwitterSite={TWITTER_HANDLE}
                ogTwitterTitle={post.title}
                ogUrl={currentURL}
              />
              <PostHeader {...post} />
              <Markdown components={components} className="markdown-body">
                {post.content}
              </Markdown>

              <div className="flex flex-row flex-wrap content-start gap-4 pl-4 mt-8 border-l-8 border-solid md:flex-nowrap border-x-orange ">
                <div className="order-2 overflow-hidden basis-full sm:order-1 md:basis-1/2">
                  <iframe
                    title="Sign up to newsletter"
                    width={"320"}
                    height={"400"}
                    src="https://cdn.forms-content.sg-form.com/8ab0a5f5-8918-11ed-bde3-9e0d879814a7"
                  />
                </div>
                <div className="order-1 basis-full sm:order-2 md:basis-auto">
                  <h4 className="text-2xl">Stay up to date</h4>
                  <p>
                    Consider keeping up to date with software development and
                    design by signing up to my newsletter.
                  </p>
                  <i>I will only email you when I make a new post.</i>
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "author",
    "category",
    "content",
    "coverImage",
    "date",
    "excerpt",
    "ogImage",
    "slug",
    "tags",
    "title",
  ]);

  const content = post ? matter.stringify(post.content, {}) : undefined;

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
