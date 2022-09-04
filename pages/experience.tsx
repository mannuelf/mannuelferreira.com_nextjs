import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import PageTitle from '@components/page-title';

const Experience = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Experience'}</title>
        </Head>
        <Container>
          <PageTitle>Experience</PageTitle>
          <div className='pt-4 mt-8 mb-8 border-t'>
            <p className='text-lg'>I have worked with many incredible people on awesome products over the years.</p>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Experience;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
