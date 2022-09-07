import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/api';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AVATAR_ME, CMS_NAME } from '@shared/constants';

type Props = {
  allPosts: Post[];
};

type pageSideNavProps = {
  title: string;
  text: string;
  href: string;
  enabled: boolean;
}[];

const pageSideNav: pageSideNavProps = [
  {
    title: 'Experience',
    text: 'My professional history as it happened.',
    href: 'experience',
    enabled: true,
  },
  {
    title: 'Side projects',
    text: 'Side projects and experiments with code.',
    href: 'side-projects',
    enabled: false,
  },
  {
    title: 'Books',
    text: "Books I've read and recommend.",
    href: 'books',
    enabled: false,
  },
].filter((item) => item.enabled);

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Home | {CMS_NAME}</title>
        </Head>
        <Container>
          <section className='content-center mb-20 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='items-center justify-self-center'>
              <Image
                className='rounded-full w-54 h-54'
                width='224'
                height='224'
                src={AVATAR_ME}
                alt={CMS_NAME}
              />
            </div>

            <div>
              <div>
                <h1 className='text-5xl font-medium'>{CMS_NAME}</h1>
                <p className='text-2xl font-light'>Software Engineer</p>
              </div>
              {pageSideNav
                ? pageSideNav.map((nav) => (
                    <Link href={nav.href} key={nav.title}>
                      <a className='mb-6 border-b-4 border-purple-900 hover:bg-white'>
                        <h2 className='text-3xl font-medium'>{nav.title}</h2>
                        <p className='text-base font-light'>{nav.text}</p>
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
