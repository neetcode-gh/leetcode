/**
 * Array | Counting
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/number-of-ways-to-split-array
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function(nums) {
    
    let currSum = 0;
    let total = nums.reduce((acc, num) => num+acc, 0);
    let totalValidSplits = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        currSum += nums[i];
        if (currSum >= total-currSum) totalValidSplits++;
    }

    return totalValidSplits;
};
