// NOTE: Cache works differently on server & client side
import NodeCache from 'node-cache';
let nodeCache;
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable */
  nodeCache = {
    get: key => { },
    set: (key, value, ttl?) => { },
    getStats: () => { },
    flushAll: () => { },
  };
  /* eslint-disable */
} else {
  nodeCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60 });
}

export { nodeCache };
