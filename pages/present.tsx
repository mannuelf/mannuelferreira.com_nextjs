import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import PageTitle from '@components/page-title';

const Present = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Present'}</title>
        </Head>
        <Container>
          <PageTitle>Present</PageTitle>
          <div className='border-t pt-4 mt-8 mb-8'>
            <p className='text-lg'>Comgin soon...</p>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Present;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
