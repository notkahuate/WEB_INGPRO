'use strict';

const TTL_MS = Number(process.env.PRODUCT_CACHE_TTL_MS || 90000);

let cache = { at: 0, data: null };
let inflight = null;

function getCachedProductList(loader) {
  const now = Date.now();
  if (cache.data && now - cache.at < TTL_MS) {
    return Promise.resolve(cache.data);
  }
  if (inflight) return inflight;

  inflight = Promise.resolve()
    .then(loader)
    .then((data) => {
      cache = { at: Date.now(), data };
      return data;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

function invalidateProductListCache() {
  cache = { at: 0, data: null };
  inflight = null;
}

module.exports = {
  getCachedProductList,
  invalidateProductListCache,
};
