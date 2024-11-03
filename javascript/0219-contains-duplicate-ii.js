/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    const window = new Set();
    let L = 0;
    for (let R = 0; R < nums.length; R++) {
        if (!window.has(nums[R])) {
            window.add(nums[R]);
        } else {
            return true
        }

        if (R - L + 1 > k) {
            window.delete(nums[L])
            L++;
        }
    }
    return false;
};
