const TIMEOUT = 6000;

export default async (url) => {
  const cacheItem = localStorage.getItem(url);

  if (cacheItem) {
    return JSON.parse(cacheItem);
  } else {

    // const controller = new AbortController();
    // const { signal } = controller;
    // setTimeout(() => controller.abort(), TIMEOUT);

    const data = await fetch(url/*, { signal }*/).then(res => res.json());
    localStorage.setItem(url, JSON.stringify(data));
    return data;
  }
}
