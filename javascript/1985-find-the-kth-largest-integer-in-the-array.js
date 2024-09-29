/**
 * Sorting
 * Time O(n*log(n)) | Space O(1)
 * https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/
 * @param {string[]} nums
 * @param {number} k
 * @return {string}
 */
var kthLargestNumber = function(nums, k) {

    // sort it string wise.
    nums.sort((a, b) => {
        if (a.length !== b.length) return b.length - a.length;
        return b.localeCompare(a);
    });

    return nums[k - 1];
};
