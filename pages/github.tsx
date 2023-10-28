import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@components/Layout/layout";
import Container from "@components/container";
import PageTitle from "../components/page-title";
import GITHUB from "@lib/github/github";

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
  const [userName, setUserName] = useState<string>("");
  const [repos, setRepos] = useState<IRepo[]>();

  useEffect(() => {
    setUserName(user.name);
    setRepos(user.repositories.nodes);
  }, [user]);

  return (
    <>
      <Layout>
        <Container>
          <section>
            <PageTitle>Github</PageTitle>
            <h2 className="mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight">
              {userName ? userName : ""}
            </h2>
            {repos ? repos.map((repo) => <h3 key={repo.name}>{repo.name}</h3>) : null}
          </section>
        </Container>
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
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: GITHUB.token,
      },
      data: JSON.stringify(githubQuery),
    });

    user = res.data.data.viewer;
  } catch (error) {
    console.error("🚨", error);
  }

  return {
    props: {
      user: user,
    },
  };
}

export default GitHub;
