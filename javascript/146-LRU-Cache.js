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

//////////////////////////////////////////////////////////////////////////////
// JavaScript Object Class Implementation
// This solution requires more code and space due to the need to separately
// define a doubly linked list and a hash map, but has better performance due
// to strictly maintaining constant time lookups and additions.
//////////////////////////////////////////////////////////////////////////////

class LRUNode {
    /**
     * @param {number} key
     * @param {number} val
     * @param {LRUNode=} next = `null`
     * @constructor
     */
    constructor(key, val, next = null) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = next;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     * @constructor
     */
    constructor(capacity) {
        this.head = null;
        this.tail = null;
        this.map = Object.create(null);
        this.length = 0;
        this.capacity = capacity;
    }
    
    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!(key in this.map)) {
            return -1;
        }
        this.makeMostRecent(key);
        return this.map[key].val;
    }
    
    /**
     * @param {number} key 
     * @param {number} val
     * @return {void}
     */
    put(key, val) {
        if (key in this.map) {
            this.map[key].val = val;
            this.makeMostRecent(key);
            return;
        }
        
        if (this.length === this.capacity) {
            delete this.map[this.tail.key];
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
        } else {
            ++this.length;
        }
        
        const node = new LRUNode(key, val, this.head);
        
        if (this.head) {
            this.head.prev = node;
        } else {
            this.tail = node;
        }
        this.head = node;
        
        this.map[key] = node;
    }
    
    /**
     * @param {number} key
     * @return {void}
     */
    makeMostRecent(key) {
        const node = this.map[key];
        
        if (node === this.head) {
            return node.val;
        }
        
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        
        node.prev = null;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
}
