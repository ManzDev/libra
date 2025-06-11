import Data from "@/data/DataPackage.js";

export const renderLinks = (name) => {

  const { homepage, url } = Data.get(name, "github")

  return /* html */`
    <div>
      <a href="${homepage}"><img src="/icons/link.svg" alt="Link"></a>
      <a href="${url}"><img src="/icons/github.svg" alt="GitHub"></a>
    </div>
  `;
}
