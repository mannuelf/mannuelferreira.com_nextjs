import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';

const ReadIt = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Read It'}</title>
        </Head>
        <Container>
          <h1>Read It</h1>
          <p>A list of my favourite reads.</p>
        </Container>
      </Layout>
    </>
  );
};

export default ReadIt;

export const getStaticProps = async () => {
  const data = {}

  return {
    props: { data },
  };
};
