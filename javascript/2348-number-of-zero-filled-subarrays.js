// https://leetcode.com/problems/number-of-zero-filled-subarrays

/**
 * @param {number[]} nums
 * @return {number}
 */
function zeroFilledSubarray(nums) {
    let counter = 0;
    return nums.reduce((acc, num) => {
        counter = num === 0 ? counter + 1 : 0;
        return acc + counter;
    }, 0);
};