/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let midIdx = Math.floor((left + right) / 2);
        if (target === nums[midIdx]) {
            return midIdx;
        }

        if (target > nums[midIdx]) {
            left = midIdx + 1;
        } else {
            right = midIdx - 1;
        }        
    }
    
    return left;
};
