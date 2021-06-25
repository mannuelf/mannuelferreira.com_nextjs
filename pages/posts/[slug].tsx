import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CMS_NAME, SITE_URL, TWITTER_HANDLE } from '@lib/constants';
import { getPostBySlug, getAllPosts } from '@lib/api';
import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PostBody from '@components/post-body';
import PostHeader from '@components/post-header';
import PostTitle from '@components/post-title';
import MetaTags from '@components/meta-tags';

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
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag='div'
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
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
            <article className='max-w-screen-md mx-auto mt-10 md:mt-20 mb-20'>
              <MetaTags
                ogImage={post.ogImage.url}
                ogSiteName={CMS_NAME}
                ogTitle={post.title}
                ogDescription={post.excerpt}
                ogTwitterCard={post.excerpt}
                ogTwitterSite={TWITTER_HANDLE}
                ogTwitterCreator={TWITTER_HANDLE}
                ogUrl={currentURL}
              />
              <PostHeader
                title={post.title}
                date={post.date}
                author={post.author}
              />
              <Markdown
                components={components}
                children={post.content}
                className='markdown-body'
              />
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
