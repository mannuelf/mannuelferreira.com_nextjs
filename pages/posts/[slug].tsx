import matter from 'gray-matter';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '@components/Layout/layout';
import Container from '@components/container';
import MetaTags from '@components/meta-tags';
import PostHeader from '@components/post-header';
import PostTitle from '@components/post-title';
import { getAllPosts, getPostBySlug } from '@lib/api';
import { CMS_NAME, SITE_URL, TWITTER_HANDLE } from '@shared/constants';

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
      const match = /language-(\w+)/.exec(className || '');
      const contents = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <SyntaxHighlighter style={dracula} language={match[1]} PreTag='div' {...props}>
          {contents}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className='mx-auto mb-20 max-w-screen-md'>
              <MetaTags
                ogDescription={post.excerpt}
                ogImage={post.ogImage.url}
                ogSiteName={CMS_NAME}
                ogTitle={post.title}
                ogTwitterCard={'summary_large_image'}
                ogTwitterCreator={TWITTER_HANDLE}
                ogTwitterImage={`${post.ogImage.url}?${Date.now()}`}
                ogTwitterSite={TWITTER_HANDLE}
                ogTwitterTitle={post.title}
                ogUrl={currentURL}
              />
              <PostHeader title={post.title} date={post.date} author={post.author} />
              <Markdown components={components} className='markdown-body'>
                {post.content}
              </Markdown>
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
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
  ]);

  const content = matter.stringify(post.content, {});

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
  const posts = getAllPosts(['slug']);

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
