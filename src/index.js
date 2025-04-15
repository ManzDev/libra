import { getLibraryInfo } from "./modules/getLibraryInfo.js";
import { putGithubStats } from "./templates/putGithubStats.js";
import { putLinks } from "./templates/putLinks.js";
import { putSpinner } from "./templates/putSpinner.js";

const library = document.querySelector(".library");
const search = library.querySelector("input[type=search]");
search.addEventListener("keyup", async (ev) => {
  const isEnter = ev.key === "Enter";

  if (isEnter) {
    const fields = [...library.querySelectorAll(":scope > div")];
    fields.forEach(field => field.setHTMLUnsafe(putSpinner()));
    const data = await getLibraryInfo(search.value);

    const fetchedData = [
      `<img src="${data.avatar}&size=128" alt="${data.name}">${data.name}`,
      data.description,
      data.version,
      putLinks(data.homepage, data.githubRepo),
      "",
      putGithubStats(data.stars, data.forks, data.issues),
      ""
    ];

    fields.forEach((field, i) => field.setHTMLUnsafe(fetchedData[i]));
  }
});
