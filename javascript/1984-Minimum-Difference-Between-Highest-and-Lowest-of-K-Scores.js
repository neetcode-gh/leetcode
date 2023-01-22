/**
 * Loglinear/N*log(N)
 * Time O(N*log(N)) | Space O(1)
 * https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function(nums, k) {

    const isEdgeCase = (k === 1);
    if (isEdgeCase) return 0;

    nums = nums.sort((a, b) => {
        return a - b;
    });

    let i = 0;
    let j = k - 1;
    let minDiffrence = Infinity;

    while (j < nums.length) {
        minDiffrence = Math.min(Math.abs(nums[i] - nums[j]), minDiffrence);
        j++;
        i++;
    }

    return minDiffrence;
};
