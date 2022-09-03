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
          <div className='pt-4 mt-8 mb-8 border-t'>
            <p className='text-lg'>Coming soon...</p>
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
