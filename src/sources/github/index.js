import Data from "@/data/DataPackage.js";

export const getGithubData = async (name) => {
  const github = Data.get(name, "github");
  const data = await fetch(`https://api.github.com/repos/${github.author}/${github.repoName}`)
    .then(res => res.json());

  Data.set(name, {
    github: {
      ...github,
      avatar: data.owner.avatar_url,
      stars: data.stargazers_count,
      forks: data.forks,
      issues: data.open_issues,
      homepage: data.homepage,
    }
  });
};

export const getLatestInfo = async (name) => {
  const github = Data.get(name, "github");
  const data = await fetch(`https://api.github.com/repos/${github.author}/${github.repoName}/releases/latest`)
    .then(res => res.json());

  Data.set(name, {
    github: {
      ...github,
      latestReleaseDate: data.published_at
    }
  });
};
