export const putVersionInfo = (version, latestReleaseDate, moduleType) => {
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
