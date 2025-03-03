/**
 * Array 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/partition-array-according-to-given-pivot/
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function(nums, pivot) {
    
    const lessThanPivot = [];
    const equalToPivot = [];
    const greaterThanPivot = [];

    for (let i = 0; i < nums.length; i++) {
        
        if (nums[i] > pivot) {
            greaterThanPivot.push(nums[i]);
        }
        if (nums[i] < pivot) {
            lessThanPivot.push(nums[i]);
        }
        if (nums[i] === pivot) {
            equalToPivot.push(nums[i]);
        }
    }

    return [...lessThanPivot, ...equalToPivot, ...greaterThanPivot];
};
