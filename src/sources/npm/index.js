import Data from "@/data/DataPackage.js";
import fetchCache from "@/data/FetchCache.js";

const TOP_N_VERSIONS = 5;

export const getPackageJSON = async (name) => {

  const data = await fetchCache(`https://unpkg.com/${name}/package.json`);

  const github = data.repository.url ? data.repository.url.replace(/\.git$/ig, "").replace("git+", "") :
    data.repository && !data.repository.includes("github.com") ? `https://github.com/${data.repository}` :
    data.repository && data.repository.includes("github.com") ? data.repository :
    data.bugs.replace("/issues", "");

  Data.set(name, {
    name: data.name,
    description: data.description,
    github: {
      url: github,
      author: github.split("/").slice(-2, -1).join("/"),
      repoName: github.split("/").slice(-1).join("/"),
    },
    "package.json": {
      main: data.main ?? "",
      exports: data?.exports["."] ?? {},
      version: data.version,
      keywords: data.keywords,
      type: data.type ?? "commonjs",
      dependencies: data.dependencies ?? {},
      devDependencies: data.devDependencies ?? {},
    },
  });
};

export const getNPMDownloads = async (name) => {
  const { downloads } = await fetchCache(`https://api.npmjs.org/versions/${name}/last-week`);

  const { downloads: totalDownloads } = await fetchCache(`https://api.npmjs.org/downloads/point/last-week/${name}`);

  // Top 5 de versiones
  const downloadsCount = Object.entries(downloads)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N_VERSIONS)
    .sort((a, b) => b[0].localeCompare(a[0]));

  const currentVersion = Data.get(name, "package.json", "version");
  const hasCurrentVersion = downloadsCount.map(item => item[0]).includes(currentVersion);

  if (!hasCurrentVersion) {
    downloadsCount.pop();
    downloadsCount.push([currentVersion, downloads[currentVersion]]);
  }

  downloadsCount.push(["total", totalDownloads]);

  Data.set(name, {
    npm: {
      downloadsCount
    }
  });
};

export const getModuleType = (name) => {
  const { main, type, exports } = Data.get(name, "package.json");

  const isESM = type === "module" || Object.keys(exports).includes("import");
  const isCommonJS = !isESM || main.endsWith(".mjs") || Object.keys(exports).includes("require");
  const isDual = isESM && isCommonJS;

  Data.set(name, {
    moduleType: {
      isESM,
      isCommonJS,
      isDual
    }
  });
};

// "ESM" -------> type: module
// "CommonJS" --> no tiene type: module o tiene algun fichero
// "Dual" ------> tiene ambos
// "Faux" ------> Dificil de calcular (mirar require())
