import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/api';
import Head from 'next/head';
import PageTitle from '@components/page-title';

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Articles'}</title>
        </Head>
        <Container>
          <PageTitle>Articles</PageTitle>
          <div className='border-t pt-4 mt-8 mb-8'>
            <p className='text-lg'></p>
          </div>
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
