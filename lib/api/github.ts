const GITHUB = {
  baseUrl: 'https://api.github.com/graphql',
  username: 'mannuelf',
  token: `bearer ${process.env.NEXT_PUBLIC_GITHUB_AUTH}`
}

export default GITHUB;
