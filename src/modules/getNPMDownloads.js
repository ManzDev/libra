const TOP_N_VERSIONS = 5;

export const getNPMDownloads = async (packageName) => {
  const { downloads } = await fetch(`https://api.npmjs.org/versions/${packageName}/last-week`)
    .then(res => res.json());

  const { downloads: totalDownloads } = await fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`)
    .then(res => res.json());

  // Top 5 de versiones
  const downloadsCount = Object.entries(downloads)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N_VERSIONS)
    .sort((a, b) => b[0].localeCompare(a[0]));

  downloadsCount.push(["total", totalDownloads]);

  return downloadsCount;
};
