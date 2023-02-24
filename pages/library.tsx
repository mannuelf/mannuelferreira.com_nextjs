import Image from 'next/image';
import type { Books } from '@api/library/library.types';
import Container from '@components/container';
import Layout from '@components/Layout/layout';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  ICON_TWITTER,
  META_BOOKS,
  TITLE_BOOKS,
  TWITTER_CARD_BOOKS,
  TWITTER_HANDLE,
  URL_TWITTER_PROFILE
} from '@shared/constants';

type Props = {
  books: Books;
}

const Books = ({ books }: Props) => {
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
          <PageTitle>Library</PageTitle>
          <div className='border-t pt-4 mt-8 mb-8'>
            <p className='text-lg'>I read or listen for fun, and sport 😃</p>
            <p className='text-lg'>I promised myself to write a post on my favourite books... for now heres a wall of books, hope you find something interesting. I exported these from my Good Reads profile, I exported the data and plan to add more to this list, no longer using Good Reads as they sunsetted their API.</p>
            <div className='p-2 border-gray-700 rounded-sm gap-2 flex center-content'>
              <a className='bg-twitterBlue rounded p-2 w-8 h-8 block' title={URL_TWITTER_PROFILE} href={URL_TWITTER_PROFILE} target='_blank' rel='noopener noreferrer'>
                <Image src={ICON_TWITTER} alt='LinkedIn' width={28} height={28} />
              </a>
              <p><a href={URL_TWITTER_PROFILE} target='_blank' rel='noopener noreferrer'>Tweet</a> me to reccomend a book I should read.</p>
            </div>
            <small className='bg-white p-2 rounded'>Cover photos thanks to API over at <a href="https://openlibrary.org/dev/docs/api/covers" target="_blank" rel="noopener noreferrer">www.openlibrary.org</a></small>
            <div className='grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {books.length ? books.map((book) => (
                <article key={book.book_id}>
                  <picture>
                    {
                      book['cover'] ? (<Image
                        blurDataURL={book['cover']}
                        placeholder='blur'
                        src={book['cover']}
                        alt={book.title}
                        width={240}
                        height={120}
                      />)
                        : null
                    }
                  </picture>
                  <header className='pt-4 w-[220px]'>
                    <h1>{book.title}</h1>
                    <div>{book['author-l-f']}</div>

                  </header>
                  <footer>
                    <div>{book.publisher}</div>
                  </footer>
                </article>)) : null}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Books;

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/library');
  const books = await res.json()

  return {
    props: { books },
  };
};
