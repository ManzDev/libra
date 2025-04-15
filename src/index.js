import { addCloseButton } from "./modules/addCloseButton.js";
import { addColumn } from "./modules/addColumn.js";
import { createTable } from "./modules/createTable.js";
import { getLibraryInfo } from "./modules/getLibraryInfo.js";
import { putGithubStats } from "./templates/putGithubStats.js";
import { putLinks } from "./templates/putLinks.js";
import { putSpinner } from "./templates/putSpinner.js";

const table = document.querySelector("table.compare");

createTable();

table.addEventListener("click", (ev) => {
  const isClose = ev.target.nodeName === "BUTTON" && ev.target.className === "close";

  if (isClose) {
    const index = ev.target.parentElement.cellIndex;
    const rows = [...table.querySelectorAll(`tr :nth-child(${index + 1})`)];
    rows.forEach(row => row.remove());
  }
});

table.addEventListener("keyup", async (ev) => {
  const isSearch = ev.target.nodeName === "INPUT" && ev.target.getAttribute("type") === "search";
  const isEnter = ev.key === "Enter";

  if (isSearch && isEnter) {
    addColumn();
    const index = ev.target.parentElement.cellIndex;
    const fields = table.querySelectorAll(`tr td:nth-of-type(${index})`);
    fields.forEach(field => field.setHTMLUnsafe(putSpinner()));
    const data = await getLibraryInfo(ev.target.value);

    const fetchedData = [
      // `<img src="${data.avatar}&size=128" alt="${data.name}">${data.name}`,
      data.name,
      data.description,
      data.version,
      putLinks(data.homepage, data.githubRepo),
      "",
      putGithubStats(data.stars, data.forks, data.issues),
      ""
    ];

    fields.forEach((field, i) => field.setHTMLUnsafe(fetchedData[i]));

    addCloseButton(fields[0]);
  }
});
