export function get(cache, path) {
  for (let i = 0; i < path.length; i++) {
    cache = cache[path[i]];
    if (!cache) {
      return null;
    } else if (cache.$type === 'atom') {
      return cache.value;
    }
  }
}
