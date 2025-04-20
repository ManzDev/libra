import Data from "@/data/DataPackage.js";

export const renderFeatures = (name) => {

  const version = Data.get(name, "package.json", "version");
  const latestReleaseDate = Data.get(name, "github", "latestReleaseDate").substring(0, 10);
  const moduleType = Data.get(name, "moduleType");
  const modules = [];
  moduleType.isESM && modules.push("esm");
  moduleType.isCommonJS && modules.push("cjs");

  const dependencies = Object.keys(Data.get(name, "package.json", "dependencies"));

  return /* html */`<div>
    <strong>${version}</strong>
    <small>${latestReleaseDate}</small>
    <div class="features">
      ${modules.map((type) => `<span class="badge ${type}">${type}</span>`)}
      ${dependencies.length === 0 ? `<span class="badge err">0-dep</span>` : ""}
    </div>
  </div>`;
}
