/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let curr = nums[0];
    let max = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        curr = Math.max(curr + nums[i], nums[i]);
        max = Math.max(max, curr)
    }
    return max;
};
