import Data from "@/data/DataPackage.js";

export const renderVersionInfo = (name) => {

  const version = Data.get(name, "package.json", "version");
  const latestReleaseDate = Data.get(name, "github", "latestReleaseDate");
  const moduleType = Data.get(name, "moduleType");

  const date = latestReleaseDate.slice(0, 10);
  const esm = moduleType.isESM ? "<div class=\"badge green\">ESM</div>" : "";
  const cjs = moduleType.isCommonJS ? "<div class=\"badge orange\">CJS</div>" : "";

  return /* html */`
    <span>${version}<small>${date}</small></span>
    <div class="row">
      ${esm} ${cjs}
    </div>
  `;
};
