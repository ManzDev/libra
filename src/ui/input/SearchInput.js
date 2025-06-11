import { addCloseButton } from "@/ui/table/CloseButton.js";
import { addColumn } from "@/ui/table/Column.js";
import { addDatalist } from "@/ui/datalist/Datalist.js";
import { addSpinner } from "@/ui/spinner/Spinner.js";

// data fetch
import Data from "@/data/DataPackage.js";
import { getDataFrom } from "@/sources/index.js";

// feature renders
import { renderData } from "@/renders/data.js";
import { renderFeatures } from "@/renders/features.js";
import { renderGithubStats, renderTopics } from "@/renders/githubStats.js";
import { renderLinks } from "@/renders/links.js";
import { renderNPMDownloads } from "@/renders/NPMDownloads.js";
import { renderVersionInfo } from "@/renders/versionInfo.js";
import { renderSizes } from "@/renders/sizes.js";

const table = document.querySelector("table.compare");
const PLACEHOLDER = "react";

export const SearchInput = /* html */`
  <input class="search" type="search" placeholder="${PLACEHOLDER}" list="search-items">
  <datalist id="search-items"></datalist>
`;

table.addEventListener("keyup", async (ev) => {
  const name = ev.target.value;
  const isSearch = ev.target.nodeName === "INPUT" && ev.target.getAttribute("type") === "search";
  const isEnter = ev.key === "Enter";

  if (isSearch && isEnter) {
    addColumn();
    const index = ev.target.parentElement.cellIndex;
    const fields = table.querySelectorAll(`tr td:nth-of-type(${index})`);
    fields.forEach(field => field.setHTMLUnsafe(addSpinner()));
    addCloseButton(fields[0]);
    await getDataFrom(name);

    const fetchedData = [
      `<span>${name}</span>`,
      renderData(name),
      renderFeatures(name),
      renderLinks(name),
      renderNPMDownloads(name),
      renderGithubStats(name),
      renderSizes(name),
      renderTopics(name)
    ];

    fields.forEach((field, i) => field.setHTMLUnsafe(fetchedData[i]));

    addCloseButton(fields[0]);
  }
});
