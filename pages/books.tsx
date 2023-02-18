import Image from 'next/image';
import type { Book } from '@api/books/book.types';
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


const Books = ({ books }) => {
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
            <p className='text-lg'>Herein a list of books I have read or currently reading. I hope you find something interesting to read yourself.</p>
            <small className='bg-white p-2'>Cover photos thanks to: <a href="https://openlibrary.org/dev/docs/api/covers" target="_blank" rel="noreferrer">www.openlibrary.org</a></small>
            <div className='grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
              {books.length ? books.map((book: Book) => (
                <div key={book.book_id} className='book__item'>
                  {
                    book['cover'] ? (<Image
                      blurDataURL={book['cover']}
                      placeholder='blur'
                      src={book['cover']}
                      alt={book.title}
                      width={220}
                      height={120}
                    />)
                    : null
                  }
                  <h1>{book.title}</h1>
                  <div>{book['author-l-f']}</div>
                  <div>{book.publisher}</div>
                </div>)) : null}
            </div>
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
