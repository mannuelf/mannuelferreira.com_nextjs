import Container from '@components/container';
import MoreStories from '@components/more-stories';
import Layout from '@components/Layout/layout';
import { getAllPosts } from '@lib/posts/index';
import Image from 'next/image';
import Link from 'next/link';
import {
  AVATAR_ME,
  CMS_NAME,
  GENERIC_META,
  SITE_URL,
  TITLE_HOME,
  TWITTER_HANDLE,
} from '@shared/constants';
import MetaTags from '@components/meta-tags';
import { TWITTER_CARD_HOME } from '../shared/constants';

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
        <MetaTags
          ogDescription={GENERIC_META}
          ogImage={TWITTER_CARD_HOME}
          ogSiteName={CMS_NAME}
          ogTitle={TITLE_HOME}
          ogTwitterCard='summary_large_image'
          ogTwitterCreator={TWITTER_HANDLE}
          ogTwitterImage={`${TWITTER_CARD_HOME}?${Date.now()}`}
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterTitle={TITLE_HOME}
          ogUrl={SITE_URL}
        />
        <Container>
          <section className='content-center mb-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
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
              <div className='mb-12 md:mb-8 text-center md:text-left '>
                <h1 className='text-5xl font-bold'>{CMS_NAME}</h1>
                <p className='text-2xl font-light'>Software Engineer</p>
              </div>
              {pageSideNav
                ? pageSideNav.map((nav) => (
                    <Link
                      href={nav.href}
                      key={nav.title}
                      className='mb-6 border-b-4 border-purple-900 hover:bg-white'
                    >
                      <h2 className='text-3xl font-medium'>{nav.title}</h2>
                      <p className='text-base font-light'>{nav.text}</p>
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

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'author',
    'category',
    'coverImage',
    'date',
    'excerpt',
    'slug',
    'tags',
    'title',
  ]);

  return {
    props: { allPosts },
  };
};

export default Index;
