/**
 * Linear 
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {

    let left = 0;
    let right = 1;
    let delCount = 0;

    while (right <= nums.length) {
        if (nums[left] === nums[right]) {
            right++;
            delCount++;
        } else {
            nums.splice(left + 1, delCount);
            delCount = 0;
            left++;
            right = left + 1;
        }
    }
};
