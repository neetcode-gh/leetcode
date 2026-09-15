/**
 * Sliding Window
 * Time O(n) | Space O(1);
 * https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {

    const total = nums.reduce((acc, num) => acc+num, 0);
    const target = total - x;

    // edge cases
    if (total === x) return nums.length;
    if (x > total) return -1;

    let left = 0;
    let right = 0;
    let currSum = 0;
    let maxSubArrCompliment = 0;

    while (right < nums.length) {

        currSum += nums[right];

        if(currSum === target) {
            maxSubArrCompliment = Math.max(maxSubArrCompliment, right-left+1);
        }

        while (left < right && currSum > target) {
            currSum -= nums[left];
            left++;
        }

        if(currSum === target) {
            maxSubArrCompliment = Math.max(maxSubArrCompliment, right-left+1);
        }

        right++;
    }
    
    if (maxSubArrCompliment === 0) return -1;
    return nums.length - maxSubArrCompliment;
};
