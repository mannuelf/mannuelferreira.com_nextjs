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
  const [userName, setUserName] = useState<UserProps | string>('');
  const [repoList, setRepoList] = useState<IRepositories | null>(null);

  useEffect(() => {
    setUserName(user.name);
    setRepoList(user.repositories.nodes);
  }, [user]);

  return (
    <>
      <Layout>
        <Container>
          hello {userName}
          {repoList &&
            repoList.map((repo) => {
              return <div>{repo.id}</div>;
            })}
        </Container>
      </Layout>
    </>
  );
}

export default GitHub;

export async function getStaticProps() {
  let user;

  const githubQuery = {
    query: `
    {
      viewer {
        name
        repositories(first: 10) {
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
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: GITHUB.token,
      },
      data: JSON.stringify(githubQuery),
    });
    user = res.data.data.viewer;
  } catch (error) {
    console.log('🚨', error);
  }

  return {
    props: {
      user,
    },
  };
}
