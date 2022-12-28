import Layout from '@components/Layout/layout';
import Container from '@components/container';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  META_BOOKS,
  TITLE_BOOKS,
  TWITTER_CARD_BOOKS,
  TWITTER_HANDLE,
} from '@shared/constants';

const Books = () => {
  return (
    <>
      <Layout>
        <MetaTags
          ogDescription={META_BOOKS}
          ogImage={TWITTER_CARD_BOOKS}
          ogSiteName={CMS_NAME}
          ogTitle={TITLE_BOOKS}
          ogTwitterCard='summary_large_image'
          ogTwitterCreator={TWITTER_HANDLE}
          ogTwitterImage={`${TWITTER_CARD_BOOKS}?${Date.now()}`}
          ogTwitterSite={TWITTER_HANDLE}
          ogTwitterTitle={TITLE_BOOKS}
          ogUrl='https://mannuelferreira.com/books'
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
