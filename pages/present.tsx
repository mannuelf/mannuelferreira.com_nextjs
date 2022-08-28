import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';

const Present = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Present'}</title>
        </Head>
        <Container>
          <h1>Present</h1>
          <p>Today I am working as Nordic developer for SATS ASA in Oslo.</p>
        </Container>
      </Layout>
    </>
  );
};

export default Present;

export const getStaticProps = async () => {
  const data = {}

  return {
    props: { data },
  };
};
