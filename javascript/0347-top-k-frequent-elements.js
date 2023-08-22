/**
 * Set - Frequency Counter | Using sort
 * Time O(NlogN) | Space O(N)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let frequency = {}
    for( let i = 0; i < nums.length; i++){
        if(frequency.hasOwnProperty(nums[i])) frequency[nums[i]] += 1;
        else frequency[nums[i]] = 1;
    }
    let result = Object.keys(frequency).map((key) => [Number(key), frequency[key]]);
    let sortedResult = result.sort((a,b) => {
        return b[1]-a[1]
    })
    let output = []
    for ( let i = 0; i < k; i++){
        output.push(sortedResult[i][0])
    }
    return output;
};

/**
 * Without Sort
 * Time O(N) | Space O(k)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
    const mp = new Map();
    const arr = new Array(nums.length + 1).fill(0);
    const ans = [];

    nums.forEach(el => {
        const val = mp.get(el) || 0;
        mp.set(el, val + 1);
    });

    for ( let [key, value] of mp ) {
        const prev = arr[value] || [];
        prev.push(key);
        arr[value] = prev;
    }


    arr.reverse();
    for (let el of arr) {
        if (k < 1) break;
        if (el) {
            for (let el2 of el) {
                ans.push(el2);
                k--;
            }
        }
    }

    return ans;
};
