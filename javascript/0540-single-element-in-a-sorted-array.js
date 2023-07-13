// Time Complexity: O(log n)
// Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let l = 0,
        r = nums.length - 2;

    while (l <= r) {
        const m = (l + r) >> 1;

        if (nums[m] === nums[m ^ 1]) l = m + 1;
        else r = m - 1;
    }

    return nums[l];
};
