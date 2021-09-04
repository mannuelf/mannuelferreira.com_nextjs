import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import Container from '@components/container';
import GITHUB from '@lib/api/github';

type UserProps = {
  user: {
    name: string;
    repositories: IRepositories;
  };
};

interface IRepo {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface IRepositories {
  nodes: [IRepo];
}

function GitHub({ user }: UserProps) {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    setUserName(user.name);
  }, [user]);

  return (
    <>
      <Layout>
        <Container>hello {!!userName ? userName : ''}</Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let user;

  const githubQuery = {
    query: `
    {
      viewer {
        name
        repositories(first: 20) {
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
        'content-type': 'application/json',
        Authorization: GITHUB.token,
      },
      data: JSON.stringify(githubQuery),
    });
    user = res.data.data.viewer;
  } catch (error) {
    console.error('🚨', error);
  }

  return {
    props: {
      user: '',
    },
  };
}

export default GitHub;
