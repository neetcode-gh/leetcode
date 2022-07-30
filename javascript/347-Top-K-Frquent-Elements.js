/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    let map = new Map();
    let res = [];
    let bucket = Array.from({ length: nums.length + 1 }, () => []); // to create unique arrays

    // storing frequency of numbers in a map
    for (let n of nums) {
        map.set(n, map.has(n) ? 1 + map.get(n) : 1);
    }

    // Poppulate the bucket with numbers in frequency
    // as the index of the bucket
    for (const [key, value] of map.entries()) {
        bucket[value].push(key);
    }

    for (let i = bucket.length - 1; i >= 0; i--) {
        if (bucket[i].length > 0) {
            for (let n of bucket[i]) {
                res.push(n);
                if (res.length === k) return res;
            }
        }
    }
};
