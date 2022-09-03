import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import Intro from '@components/intro';

const Past = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Past'}</title>
        </Head>
        <Container>
          <h1>Past</h1>
          <Intro/>
          <p>My professional history as it happened.</p>
        </Container>
      </Layout>
    </>
  );
};

export default Past;

export const getStaticProps = async () => {
  const data = {}

  return {
    props: { data },
  };
};
