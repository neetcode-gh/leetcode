/**
 * Sliding Window | Two pointer
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {

    const max = Math.max(...nums);
    let maxCount = 0;
    let left = 0;
    let right = 0;  
    let total = 0;

    while (right < nums.length) {
        
        maxCount += nums[right] === max ? 1 : 0;
        
        while (maxCount === k) {
            maxCount -= nums[left] === max ? 1 : 0;
            left++;
        }

        total += left;
        right++;
    }

    return total;
};
