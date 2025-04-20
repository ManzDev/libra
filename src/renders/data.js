import Data from "@/data/DataPackage.js";

export const renderData = (name) => {

  const image = Data.get(name, "github", "avatar");
  const description = Data.get(name, "description");

  return /* html */`<div class="column-2">
    <style>
      @scope {
        :scope {
          --size: 64px;

          padding: 0.5rem 0;
        }

        .avatar {
          width: var(--size);
          aspect-ratio: 1;
        }
        span {
          z-index: 5;
        }
      }
    </style>
    <img class="avatar" src="${image}&size=128" alt="${name}">
    <span>${description}</span>
  </div>`;
}
