/**
 * @param {number} capacity
 */
export let LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cacheMap = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cacheMap.has(key)) {
    return -1
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

/** 
 * 1 <= capacity <= 3000
 * 0 <= key <= 104
 * 0 <= value <= 105
 * At most 2 * 105 calls will be made to get and put.
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */