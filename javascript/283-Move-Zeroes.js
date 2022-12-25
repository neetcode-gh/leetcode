/**
 * Linear Time
 * Time Complexity  O(N) | Space Complexity O(N);
 * https://leetcode.com/problems/move-zeroes/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {

    const zeroAtTheEnd = Array(nums.length).fill(0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i]) {
            zeroAtTheEnd[left] = nums[i];
            left++;
        }
    }
    return zeroAtTheEnd;
};

/**
 * 2 Pointer
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/move-zeroes/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = (nums) => {
    let [ left, right ] = [ 0, 0 ];

    while (right < nums.length) {
        const canSwap = (nums[right] !== 0)
        if (canSwap) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }

        right++;
    }
};
