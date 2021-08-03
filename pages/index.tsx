import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Intro from '@components/intro';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/api';
import Head from 'next/head';
import { CMS_NAME } from '@shared/constants';
import LogRocket from 'logrocket';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
  LogRocket.init(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannueferreiracom`);
}

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
