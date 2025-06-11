import Data from "@/data/DataPackage.js";
import { formatNumber } from "@/modules/formatNumber.js";
import "./NPMDownloads.css";

export const renderNPMDownloads = (name) => {

  const currentVersion = Data.get(name, "package.json", "version");
  const versions = Data.get(name, "npm", "downloadsCount");
  const [, total] = versions.pop();
  const max = Math.max(...versions.map(([version, q]) => q ?? 0));

  const generateBar = ([ version, number ]) => {
    const quantity = formatNumber(number ?? 0);
    const size = Math.floor(((number ?? 0) * 100) / max);
    const fontWeight = size === 100 ? "highlight" : "";

    return /* html */`<div class="column ${fontWeight}">
      <span class="q">${quantity}</span>
      <div class="bar" style="--size: ${size}%"><div class="inner"></div></div>
      <span class="v">${version}</span>
    </div>`;
  };

  return /* html */`
  <div class="npm-downloads">
    ${versions.map(data => generateBar(data)).join("")}
  </div>`;
};
