import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import matter from 'gray-matter';

import { CMS_NAME } from '@lib/constants';
import { getPostBySlug, getAllPosts } from '@lib/api';
import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PostBody from '@components/post-body';
import PostHeader from '@components/post-header';
import PostTitle from '@components/post-title';

type Props = {
  post: Post;
  morePosts: Post[];
  preview?: boolean | undefined;
};

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={dracula}>
      {value}
    </SyntaxHighlighter>
  );
};

const Post = ({ post }: Props) => {
  const router = useRouter();

  const renderWithCode = post.content.content;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mt-20 mb-20">
              <Head>
                <title>
                  {post.title} | {CMS_NAME}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
                <meta name="description" content={post.excerpt} />
              </Head>
              <PostHeader
                title={post.title}
                date={post.date}
                author={post.author}
              />
              <ReactMarkdown
                className="markdown-body"
                source={renderWithCode}
                renderers={{ code: CodeBlock }}
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
  ]);

  const content = matter(post.content || '');

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
