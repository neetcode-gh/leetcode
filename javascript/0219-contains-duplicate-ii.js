/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const window = new Set();
  let L = 0;
  for (let R = 0; R < nums.length; R++) {
    if (R - L > k) {
      window.delete(nums[L]);
      L += 1;
    }
    if (window.has(nums[R]))
      return true;
    window.add(nums[R]);
  }
  return false;
};
