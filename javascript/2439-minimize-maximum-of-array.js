/**
 * Time O(n) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var minimizeArrayValue = function(nums) {
    
    let currTotal = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currTotal += nums[i];
        max = Math.max(max, Math.ceil(currTotal / (i + 1)));
    }
    return max;
};
