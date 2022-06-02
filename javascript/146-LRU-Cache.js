//////////////////////////////////////////////////////////////////////////////
// JavaScript Map Class Implementation
// This solution produces a lot less code, but is exposed to poor performance
// due to Map's internal maintenance of the order of properties. Constantly
// deleting and resetting properties upon each retrieval is costly.
//////////////////////////////////////////////////////////////////////////////

/**
 * @param {number} capacity
 */
function LRUCache(capacity) {
  this.capacity = capacity;
  this.cacheMap = new Map();
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cacheMap.has(key)) {
    return -1;
  }
  const value = this.cacheMap.get(key);
  this.cacheMap.delete(key);
  this.cacheMap.set(key, value);
  return value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cacheMap.has(key)) {
    this.cacheMap.delete(key);
  } else if (this.cacheMap.size === this.capacity) {
    const leastRecentlyUsedKey = this.cacheMap
      .keys()
      .next()
      .value;
    this.cacheMap.delete(leastRecentlyUsedKey);
  }
  this.cacheMap.set(key, value);
};
