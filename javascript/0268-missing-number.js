/**
 * https://leetcode.com/problems/missing-number/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums, missingNumber = nums.length) {
    for (let i = 0; i < nums.length; i++) {
        const xor = (i ^ nums[i]);

        missingNumber ^= xor;
    }

    return missingNumber;
};
