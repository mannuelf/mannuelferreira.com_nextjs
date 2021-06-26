import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import Container from '@components/container';
import GITHUB from '@lib/api/github';

type UserProps = {
  user: {
    name: string;
    repositories: {
      nodes: [];
    };
  };
};

function GitHub({ user }: UserProps) {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);

  useEffect(() => {
    setUserName(user.name);
    setRepoList(user.repositories.nodes);
  }, []);

  return (
    <>
      <Layout>
        <Container>hello {userName}</Container>
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
