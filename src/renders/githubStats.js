import Data from "@/data/DataPackage.js";
import { formatNumber } from "@/modules/formatNumber.js";

// Images
import iconStars from "../../public/icons/stars.svg?raw";
import iconForks from "../../public/icons/forks.svg?raw";
import iconIssues from "../../public/icons/issues.svg?raw";

export const renderGithubStats = (name) => {

  const github = Data.get(name, "github");

  const stars = formatNumber(github.stars);
  const forks = formatNumber(github.forks);
  const issues = formatNumber(github.issues);

  return /* html */`
    <style>
      @scope {
        span {
          border: 1px solid #e7e7e7;
          color: #787878;
          font-weight: 350;
          padding: 0.5rem;
        }

        span svg {
          width: 32px;
          vertical-align: middle;
        }
      }
    </style>
    <div class="github-stats">
      <span>${iconStars}${stars}</span>
      <span>${iconForks}${forks}</span>
      <span>${iconIssues}${issues}</span>
    </div>
  `;
};
