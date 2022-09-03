import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/api';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CMS_NAME } from '@shared/constants';

type Props = {
  allPosts: Post[];
};

const pageSideNav = [
  { title: 'Past', text: 'My professional history', href: 'past' },
  { title: 'Present', text: 'What I am up to today', href: 'present' },
  {
    title: 'Side projects',
    text: 'Side projects and experiments with code',
    href: 'projects',
  },
  { title: 'Books', text: "Books I've read and reccommend", href: 'books' },
];

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <section className='mb-20 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='items-center'>
              <Image
                className='rounded-full w-54 h-54'
                width='224'
                height='224'
                src='https://res.cloudinary.com/mannuel/image/upload/v1636496492/images/mee.jpg'
                alt='Mannuel Ferreira'
              />
            </div>
            <div>
              {pageSideNav
                ? pageSideNav.map((nav) => (
                    <Link href={nav.href} key={nav.title}>
                      <a className='mb-6 border-b-4 border-purple-900'>
                        <h2 className='text-3xl font-medium'>{nav.title}</h2>
                        <p>{nav.text}</p>
                      </a>
                    </Link>
                  ))
                : null}
            </div>
          </section>

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
