/**
 * @param {number[]} nums
 * Time O(N) | Space O(N)
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    return (new Set(nums)).size !== nums.length
};