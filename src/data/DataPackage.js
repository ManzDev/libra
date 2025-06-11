const db = new Map();

const getOrCreatePackage = (packageName) => {
  !db.has(packageName) && db.set(packageName, new Map());
  return db.get(packageName);
};

const set = (packageName, objectData) => {
  const pkg = getOrCreatePackage(packageName);
  for (const [key, value] of Object.entries(objectData)) {
    pkg.set(key, value);
  }
};

const get = (packageName, ...path) => {
  const pkg = db.get(packageName);
  if (!pkg) return null;

  const plain = Object.fromEntries(pkg.entries());

  if (path.length === 0) return plain;

  let current = plain;
  for (const key of path) {
    if (current == null || typeof current !== "object") return null;
    current = current[key];
  }

  return current ?? null;
};

export default {
  set,
  get
};
