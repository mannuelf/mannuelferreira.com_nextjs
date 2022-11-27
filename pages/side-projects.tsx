import Container from '@components/container';
import Layout from '@components/Layout/layout';
import Head from 'next/head';
import PageTitle from '@components/page-title';

const Projects = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Side projects'}</title>
        </Head>
        <Container>
          <PageTitle>Projects</PageTitle>
          <div className='pt-4 mt-8 mb-8 border-t'>
            <p className='text-lg'>Coming soon...</p>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Projects;

export const getStaticProps = async () => {
  const data = {};

  return {
    props: { data },
  };
};
