import type { Books } from '@api/books/books.types';
import Container from '@components/container';
import Layout from '@components/Layout/layout';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  META_BOOKS,
  TITLE_BOOKS,
  TWITTER_CARD_BOOKS,
  TWITTER_HANDLE
} from '@shared/constants';


const Books = (books: Books[]) => {
  console.log(books);
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
            <p className='text-lg'>A list of books I have read, hoping you find something interesting to you.</p>
            {books.length ? books.map((book, i) => (<>
              <h1>{book.title}</h1>
            </>)): null}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Books;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/books');
  const books = await res.json()

  return {
    props: { books },
  };
};
