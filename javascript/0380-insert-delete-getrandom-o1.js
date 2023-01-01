var RandomizedSet = function () {
    this.set = new Set();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    const res = !this.set.has(val);
    if (res) {
        this.set.add(val);
    }
    return res;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    return this.set.delete(val);
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    const keys = Array.from(this.set.keys());
    const seed = Math.floor(Math.random() * keys.length);
    return keys[seed];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
