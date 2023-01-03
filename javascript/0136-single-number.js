/**
 * https://leetcode.com/problems/single-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums, xor = 0) {
    for (num of nums) {
        xor ^= num;
    }

    return xor;
};
