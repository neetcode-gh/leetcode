/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function (nums) {
    let bitOR = 0;
    for (let i = 0; i < nums.length; ++i) {
        bitOR |= nums[i];
    }
    return (bitOR * Math.pow(2, nums.length - 1));
};