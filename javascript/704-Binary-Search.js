/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);

        if (nums[middle] === target) {
            return middle;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
};

// Runtime: 98 ms, faster than 34.02% of JavaScript online submissions for Binary Search.
// Memory Usage: 44.3 MB, less than 99.18% of JavaScript online submissions for Binary Search.
