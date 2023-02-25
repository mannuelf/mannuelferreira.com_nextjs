import { useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';
import Layout from '@components/Layout/layout';
import Container from '@components/container';
import PageTitle from '../components/page-title';
import GITHUB from '@lib/github/github';

type UserProps = {
  name: string;
  repositories: IRepositories;
};

interface IApiError {
  message: string;
  response?: {
    status: number;
    data?: any;
  };
}

interface IRepo {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface IRepositories {
  nodes: [IRepo];
}

function GitHub({ user, apiError }: { user: UserProps, apiError: IApiError }) {
  const [userName, setUserName] = useState<string>('');
  const [repos, setRepos] = useState<IRepo[]>();
  const [errorMessage, setErrorMessage] = useState<AxiosError>();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setRepos(user.repositories.nodes);
    }
    setErrorMessage(apiError);
  }, [user, apiError]);

  if (errorMessage) {
    return (
      <>
        <Layout>
          <Container>
            <section>
              <PageTitle>Github</PageTitle>
              <h2 className='mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight'>
                Error
              </h2>
              {apiError?.message} with message: { apiError.response?.data.message}
            </section>
          </Container>
        </Layout>
      </>
    );
  }

  if (!user) {
    return <>
      <Layout>
        <Container>
          <section>
            <PageTitle>Github</PageTitle>
            <h2 className='mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight'>
              Loading...
            </h2>
          </section>
        </Container>
      </Layout>
    </>;
  }

  return (
    <>
      <Layout>
        <Container>
          <section>
            <PageTitle>Github</PageTitle>
            <h2 className='mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight'>
              {userName ? userName : null}
            </h2>
            {repos ? repos.map((repo) => <h3 key={repo.name}>{repo.name}</h3>) : null}
          </section>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let user: UserProps | null = null;
  let apiError: IApiError | null = null;

  const githubQuery = {
    query: `
    {
      viewer {
        name
        repositories(last: 20) {
          nodes {
            name
            description
            id
            url
          }
        }
      }
    }
    `,
  };

  try {
    const res = await axios({
      url: GITHUB.baseUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: GITHUB.token,
      },
      data: JSON.stringify(githubQuery),
    });

    user = res.data.data.viewer;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      apiError = {
        message: error.message,
        response: error.response
          ? {
            status: error.response.status,
            data: error.response.data,
          }
          : undefined,
      };
    }

    console.error('🚨', error);
  }

  return {
    props: {
      user: user ?? null,
      apiError
    },
  };
}

export default GitHub;
