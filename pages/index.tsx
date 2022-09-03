import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/api';
import Head from 'next/head';
import Image from 'next/image';
import { CMS_NAME } from '@shared/constants';

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
          <div className='flex flex-grow justify-center'>
            <div className='basis-3/6 justify-self-auto overflow-hidden'>
              <Image
                width={220}
                layout='fill'
                src='https://res.cloudinary.com/mannuel/image/upload/v1636496492/images/mee.jpg'
                alt='Mannuel Ferreira'
              />
            </div>
            <div className='basis-3/6 justify-self-auto'>Aside</div>
          </div>
          {allPosts.length > 0 && <MoreStories posts={allPosts.slice(0, 4)} />}
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
