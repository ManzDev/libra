import { getGithubInfo } from "./getGithubInfo.js";
import { getLatestInfo } from "./getLatestInfo.js";
import { getModuleType } from "./getModuleType.js";
import { getNPMDownloads } from "./getNPMDownloads.js";
import { getPackageInfo } from "./getPackageInfo.js";
// import { getDependencies } from "./getDependencies.js";

export const getLibraryInfo = async (name) => {
  const packageData = await getPackageInfo(name);
  const repoName = packageData.githubRepo.split("/").slice(-2).join("/");
  const githubData = await getGithubInfo(repoName);
  const npmDownloads = await getNPMDownloads(name);
  const { latestReleaseDate } = await getLatestInfo(repoName);
  const moduleType = getModuleType(packageData);

  return {
    ...packageData,
    ...githubData,
    ...repoName,
    moduleType,
    latestReleaseDate,
    npmDownloads
  };
};
