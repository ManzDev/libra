import { getPackageJSON, getNPMDownloads, getModuleType } from "@/sources/npm/index.js";
import { getGithubData, getLatestInfo } from "@/sources/github/index.js";
import { getBundleJSData } from "@/sources/bundlejs/index.js";

export const getDataFrom = async (name) => {
  await getPackageJSON(name);
  await getGithubData(name);
  await getNPMDownloads(name);
  await getLatestInfo(name);
  await getBundleJSData(name);
  getModuleType(name);
};
