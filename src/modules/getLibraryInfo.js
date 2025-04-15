import { getGithubInfo } from "./getGithubInfo.js";
import { getNPMDownloads } from "./getNPMDownloads.js";
import { getPackageInfo } from "./getPackageInfo.js";

export const getLibraryInfo = async (name) => {
  const packageData = await getPackageInfo(name);
  const reponame = packageData.githubRepo.split("/").slice(-2).join("/");
  const githubData = await getGithubInfo(reponame);
  const npmDownloads = await getNPMDownloads(name);

  return {
    ...packageData,
    ...githubData,
    npmDownloads
  };
};
