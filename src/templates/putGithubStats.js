import { formatNumber } from "../modules/formatNumber.js";

export const putGithubStats = (initialStars, initialForks, initialIssues) => {
  const stars = formatNumber(initialStars);
  const forks = formatNumber(initialForks);
  const issues = formatNumber(initialIssues);

  return /* html */`
    <div>
      <span><img src="icons/stars.svg" alt="Stars">${stars}</span>
      <span><img src="icons/forks.svg" alt="Forks">${forks}</span>
      <span><img src="icons/issues.svg" alt="Issues">${issues}</span>
    </div>
  `;
};
