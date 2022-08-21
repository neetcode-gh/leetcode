/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    let result = nums[0];
    let prevMax = nums[0];
    let prevMin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], prevMax * nums[i], prevMin * nums[i]);
        currMin = Math.min(nums[i], prevMax * nums[i], prevMin * nums[i]);

        prevMax = currMax;
        prevMin = currMin;

        result = Math.max(currMax, result);
    }
    return result;
};
