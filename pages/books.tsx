import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  META_BOOKS,
  TWITTER_CARD_POSTS,
  TWITTER_HANDLE,
} from '@shared/constants';
import MetaTags from '@components/meta-tags';

const Books = () => {
  return (
    <>
      <Layout>
        <MetaTags
          ogTitle={'Books'}
          ogImage={TWITTER_CARD_POSTS}
          ogDescription={META_BOOKS}
          ogUrl='https://mannuelferreira.com/books'
          ogSiteName={CMS_NAME}
          ogTwitterCard='summary_large_image'
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterCreator={TWITTER_HANDLE}
        />
        <Container>
          <PageTitle>Books</PageTitle>
          <div className='border-t pt-4 mt-8 mb-8'>
            <p className='text-lg'>Coming soon...</p>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Books;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
