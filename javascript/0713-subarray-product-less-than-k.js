/**
 * Sliding Window | Two Pointer
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/subarray-product-less-than-k/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    
    if (!k) return 0;
    let left = 0;
    let right = 0;
    let currProduct = 1;
    let totalSubArrs = 0;

    while (right < nums.length) {
        
        currProduct *= nums[right];
        while (left < right && currProduct >= k) {
            currProduct /= nums[left];
            left++;
        }

        if (currProduct < k) {
            totalSubArrs += right - left + 1;
        }
        right++;
    }
    return totalSubArrs;
};
