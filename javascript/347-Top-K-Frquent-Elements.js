/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = new Map();
    let res = [];
    let bucket = new Array(nums.length+1);
    
    // storing frequency of numbers in a map
    for (let n of nums) {
        map.set(n, (map.has(n) ? 1 + map.get(n) : 1))
    }

    // Poppulate the bucket with numbers in frequency as the index of the bucket
    for (let [key,value] of map.entries()) {
        if (!Array.isArray(bucket[value])) {
            bucket[value] = [];
        }
        bucket[value].push(key);
    }
    
    for (let i = bucket.length-1; i >= 0; i--) {
        if (Array.isArray(bucket[i])) {
            for (let n of bucket[i]) {
                res.push(n);
                if (res.length === k)
                    return res;
            }
        }
    }
};