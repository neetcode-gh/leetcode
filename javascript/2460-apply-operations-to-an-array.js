/**
 * Array | Simulation
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/apply-operations-to-an-array
 * @param {number[]} nums
 * @return {number[]}
 */
var applyOperations = function(nums) {
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i-1]) {
            nums[i-1] = nums[i-1] * 2;
            nums[i] = 0;
        }
    }

    const nonZeros = nums.filter((num) => num !== 0);
    return [...nonZeros, ...new Array(nums.length - nonZeros.length).fill(0)];
};
