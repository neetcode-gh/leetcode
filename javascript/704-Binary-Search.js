/**
 * @param {number[]} nums
 * @param {number} target
 * Time O(log(N)) | Space O(1)
 * @return {number}
 */
var search = function(nums, target) {
    let [ left, right ] = [ 0, (nums.length - 1) ];

    while (left <= right) {
        const mid = (left + right) >> 1;
        const guess = nums[mid];

        const isTarget = guess === target;
        if (isTarget) return mid;

        const isTargetGreater = guess < target;
        if (isTargetGreater) left = mid + 1;

        const isTargetLess = target < guess;
        if (isTargetLess) right = mid - 1;
    }

    return -1;
};
