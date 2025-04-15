export const getLatestInfo = async (repoName) => {
  const data = await fetch(`https://api.github.com/repos/${repoName}/releases/latest`).then(res => res.json());

  return {
    latestReleaseDate: data.published_at
  };
};
