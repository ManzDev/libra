import Data from "@/data/DataPackage.js";
import { formatNumber } from "@/modules/formatNumber.js";

export const renderNPMDownloads = (name) => {

  const currentVersion = Data.get(name, "package.json", "version");
  const versions = Data.get(name, "npm", "downloadsCount");

  return /* html */`
    <div class="npm-downloads column-2">
      ${versions.map(([version, quantity]) => {
        const classNames = [];
        version === currentVersion && classNames.push("latest");
        version === "total" && classNames.push(version);

        return /* html */`
          <span class="version ${classNames.join(" ")}">${version}</span>
          <span>${formatNumber(quantity)}</span>
        `;
      }).join("")}
    </div>
  `;
};
