/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// Solution 1
var topKFrequent = function(nums, k) {
    // Calculating frequency of elements in nums in map object
    // map sample output -> { '1': 3, '2': 2, '3': 1 }
    let map = {};
    for(let i = 0; i < nums.length; i++) {
        if(map.hasOwnProperty(nums[i])) {
            map[nums[i]]++;
        } else {
            map[nums[i]] = 1;
        }
    }

    // Converting map object to array mapArray to sort them based on frequency
    // mapArray sample out put -> [ [ '1', 3 ], [ '2', 2 ], [ '3', 1 ] ]

    let mapArray = [];
    for(let key in map) {
        mapArray.push([key, map[key]])
    }
    
    // Sorting mapArray array based on frequency value
    let r = mapArray.sort((a, b) => Number(b[1]) - Number(a[1]));
    
    // Pushing only k number of items to result array
    let result = [];
    for(l = 0; l < k; l++) {
        result.push(r[l][0]);
    }
    return result;
};


// Solution 2
var topKFrequent = function(nums, k) {
    let map = new Map();
    let res = [];
    let bucket = Array.from({ length: nums.length + 1 }, () => []); // to create unique arrays
    
    // storing frequency of numbers in a map
    for (let n of nums) {
        map.set(n, (map.has(n) ? 1 + map.get(n) : 1))
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
                if (res.length === k)
                    return res;
            }
        }
    }
};
