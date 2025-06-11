import Data from "@/data/DataPackage.js";
import fetchCache from "@/data/FetchCache.js";

export const getBundleJSData = async (name) => {

  const data = await fetchCache(`https://edge.bundlejs.com/?q=${name}`);

  Data.set(name, {
    bundlejs: {
      size: data.size.rawUncompressedSize,
      gzip: data.size.rawCompressedSize,
      depSize: data?.installSize.total ?? "Unknown"
    }
  });
}
