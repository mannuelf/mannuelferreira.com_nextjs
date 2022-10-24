const GITHUB = {
  baseUrl: `${process.env.GITHUB_GRAPHQL_ENDPOINT}`,
  username: `${process.env.GITHUB_USERNAME}`,
  token: `bearer ${process.env.GITHUB_AUTH}`,
};

export default GITHUB;
