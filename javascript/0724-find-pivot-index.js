/**
 * https://leetcode.com/problems/find-pivot-index/
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    const totalSum = nums.reduce((sum, el) => {
        sum += el;
        return sum;
    }, 0);
    let pos = 0;
    let leftSum = 0;
    while (pos <= nums.length - 1) {
        if (leftSum === totalSum - nums[pos] - leftSum) {
            return pos;
        }
        leftSum += nums[pos];
        pos++;
    }
    return -1;
};
