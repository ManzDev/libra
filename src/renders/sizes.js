import iconSquirrel from "../../public/icons/squirrel.svg?raw";
import iconCat from "../../public/icons/cat.svg?raw";
import iconCapybara from "../../public/icons/capybara.svg?raw";
import iconElephant from "../../public/icons/elephant.svg?raw";
import { formatNumber } from "@/modules/formatNumber.js";
import Data from "@/data/DataPackage.js";

const PREDEFINED_SIZES = [
  { size: 5000, icon: iconSquirrel },
  { size: 50000, icon: iconCat },
  { size: 100000, icon: iconCapybara },
  { size: 500000, icon: iconElephant },
];

export const renderSizes = (name) => {

  const { size, gzip, depSize } = Data.get(name, "bundlejs");
  const index = PREDEFINED_SIZES.findIndex(item => size < item.size) ?? PREDEFINED_SIZES.length;
  const TOTAL_SIZE = PREDEFINED_SIZES[index].size;
  const iconAnimal = PREDEFINED_SIZES[index].icon;

  return /* html */`
  <div>
  <style>
      @scope {
        :scope {
          display: flex;
          gap: 1rem;
          align-items: center;
          width: max-content;
          margin: auto;
        }

        svg {
          color: #999;
        }

        .bar {
          --gzip-size: ${(gzip * 100) / TOTAL_SIZE}%;
          --size: ${(size * 100) / TOTAL_SIZE}%;

          width: 200px;
          height: 25px;
          background: #ccc;
          display: flex;
          position: relative;

          & > div {
            position: absolute;
            left: 0;

            &::after {
              content: "";
              background: linear-gradient(to bottom, transparent 25%, #0005 70% 100%);
              display: block;
              position: absolute;
              inset: 0;
            }
          }

          & .gzip-bar { width: var(--gzip-size); height: 100%; background: green; z-index: 2; }
          & .size-bar { width: var(--size); height: 100%; background: gold; z-index: 1; }
        }
      }
    </style>
    <span title="< ${formatNumber(TOTAL_SIZE)}">${iconAnimal}</span>
    <div class="bar">
      <div class="gzip-bar" title="${formatNumber(gzip)}"></div>
      <div class="size-bar" title="${formatNumber(size)}"></div>
    </div>
  </div>
  `;

}

