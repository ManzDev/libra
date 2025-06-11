import Data from "@/data/DataPackage.js";
import fetchCache from "@/data/FetchCache.js";

export const getGithubData = async (name) => {

  const github = Data.get(name, "github");
  const repoName = `${github.author}/${github.repoName}`;

  const data = await fetchCache(`https://api.github.com/repos/${repoName}`);

  Data.set(name, {
    github: {
      ...github,
      avatar: data.owner.avatar_url,
      stars: data.stargazers_count,
      forks: data.forks,
      issues: data.open_issues,
      homepage: data.homepage,
      topics: data.topics
    }
  });
};

export const getLatestInfo = async (name) => {

  const github = Data.get(name, "github");
  const repoName = `${github.author}/${github.repoName}`;

  const data = await fetchCache(`https://api.github.com/repos/${repoName}/releases/latest`);

  Data.set(name, {
    github: {
      ...github,
      latestReleaseDate: data.published_at
    }
  });
};
