export const getPackageInfo = async (name) => {
  const data = await fetch(`https://unpkg.com/${name}/package.json`).then(res => res.json());
  return {
    name: data.name,
    description: data.description,
    version: data.version,
    moduleType: data.type ?? "commonjs",
    githubRepo: data.repository.url.slice(0, -4).replace("git+", ""),    // - ".git"
  };
};
