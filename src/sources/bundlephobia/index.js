import Data from "@/data/DataPackage.js";
import fetchCache from "@/data/FetchCache.js";

export const getBundlePhobiaData = async (name) => {

  const data = await fetchCache(`https://bundlephobia.com/api/size?package=${name}`);

  Data.set(name, {
    bundlephobia: {
      size: data.size,
      gzip: data.gzip,
      depSize: data?.dependencySizes.reduce((acc, { approximateSize }) => acc + approximateSize, 0) ?? 0
    }
  });
}
