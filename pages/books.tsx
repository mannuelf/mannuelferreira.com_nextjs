import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import PageTitle from '@components/page-title';

const Books = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Books'}</title>
        </Head>
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
