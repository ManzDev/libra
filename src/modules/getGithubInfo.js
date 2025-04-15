export const getGithubInfo = async (reponame) => {
  const data = await fetch(`https://api.github.com/repos/${reponame}`).then(res => res.json());
  return {
    avatar: data.owner.avatar_url,
    stars: data.stargazers_count,
    forks: data.forks,
    issues: data.open_issues,
    homepage: data.homepage,
  };
};
