import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import PageTitle from '@components/page-title';

const Past = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Past'}</title>
        </Head>
        <Container>
          <PageTitle>Past</PageTitle>
          <div className='border-t pt-4 mt-8 mb-8'>
            <p className='text-lg'>Well here we are...</p>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Past;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
