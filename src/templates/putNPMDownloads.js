import { formatNumber } from "../modules/formatNumber.js";

export const putNPMDownloads = (versions, currentVersion) => {
  console.log(versions);

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
