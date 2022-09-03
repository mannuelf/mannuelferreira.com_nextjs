import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';

const Books = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Read It'}</title>
        </Head>
        <Container>
          <h1>Books</h1>
          <p>A list of my favourite reads.</p>
        </Container>
      </Layout>
    </>
  );
};

export default Books;

export const getStaticProps = async () => {
  const data = {}

  return {
    props: { data },
  };
};
