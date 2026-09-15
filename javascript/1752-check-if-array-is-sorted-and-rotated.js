/**
 * Array | Sorting
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/check-if-array-is-sorted-and-rotated
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function(nums) {
    
    let dipCount = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i-1]) dipCount++;
        if (dipCount > 1) return false;
    }
    
    if (dipCount === 0) return true;
    return dipCount === 1 && nums[0] >= nums[nums.length - 1];
};
