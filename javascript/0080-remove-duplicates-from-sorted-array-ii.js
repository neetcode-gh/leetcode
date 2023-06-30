/**
 * Linear 
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length < 3) {
        return nums.length;
    }
    let l = 1;
    let r = 2;
    while (r < nums.length) {
        if (nums[l] !== nums[r] || (nums[l] === nums[r] && nums[l-1] !== nums[r])) {
            l += 1;
            nums[l] = nums[r];
        }
        r += 1;
    }
    return l + 1;
};
