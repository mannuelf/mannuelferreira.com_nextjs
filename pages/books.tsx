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


const Books = ({ books }: Book[]) => {
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
            <p className='text-lg'>Herein a list of books I have read or currently reading. I hope you find something interesting to you.</p>
            <p className='text-lg'>Through the wonder of Audible I have managed to enjoy many books in record time, what I&rsquo;ve found is Audible is not good for technical books so I have started buying paperback and hardbacks again, I love it.</p>
            <p className='text-lg'>Some times in difficult to remember what you&rsquo;ve read and this list is for me to refer to to see if there is anythign I should revisit that might be helpful in my daily and or professional life.</p>
            <div className='grid grid-flow-row grid-cols-4 gap-3'>
              {books.length ? books.map((book: Book) => (
                <div key={book.book_id} className='book__item'>
                  <h1>{book.title}</h1>
                  <span>{book['author-l-f']}</span>
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
