import Data from "@/data/DataPackage.js";

const TOP_N_VERSIONS = 5;

export const getPackageJSON = async (name) => {

  const data = await fetch(`https://unpkg.com/${name}/package.json`).then(res => res.json());
  const github = data.repository.url.replace(/\.git$/ig, "").replace("git+", "");

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
      version: data.version,
      type: data.type ?? "commonjs",
      dependencies: data.dependencies ?? {},
      devDependencies: data.devDependencies ?? {},
    },
  });
};

export const getNPMDownloads = async (name) => {
  const { downloads } = await fetch(`https://api.npmjs.org/versions/${name}/last-week`)
    .then(res => res.json());

  const { downloads: totalDownloads } = await fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`)
    .then(res => res.json());

  // Top 5 de versiones
  const downloadsCount = Object.entries(downloads)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N_VERSIONS)
    .sort((a, b) => b[0].localeCompare(a[0]));

  downloadsCount.push(["total", totalDownloads]);

  Data.set(name, {
    npm: {
      downloadsCount
    }
  });
};

export const getModuleType = (name) => {
  const { main, type } = Data.get(name, "package.json");

  const isESM = type === "module";
  const isCommonJS = !isESM || main.endsWith(".mjs");
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
