/**
 * https://leetcode.com/problems/jump-game-ii/
 * Time: O(n)
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    //Start at index 0
    let left = 0;
    let right = 0;
    let jumps = 0;

    //Once right >= last index, the last jump can be made
    while (right < nums.length - 1) {
        let maxReach = 0;

        //Use maxReach of previous jump to find the maxReach of the current jump
        for (var i = left; i < right + 1; i++) {
            maxReach = Math.max(maxReach, nums[i] + i);
        }

        left = right + 1;
        right = maxReach;
        jumps += 1;
    }
    return jumps;
};