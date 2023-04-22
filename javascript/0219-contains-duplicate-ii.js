/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    let leftPtr = 0;
    let rightPtr = 0;
    let windowHashMap = new Map();
    while (rightPtr < nums.length) {
        if (windowHashMap.has(nums[rightPtr])) {
            return true;
        } else {
            windowHashMap.set(nums[rightPtr], 1);
        }
        rightPtr++;
        if (rightPtr - leftPtr > k) {
            let leftPtrValue = windowHashMap.get(nums[leftPtr]);
            leftPtrValue--;
            if (leftPtrValue == 0) {
                windowHashMap.delete(nums[leftPtr]);
            } else {
                windowHashMap.set(nums[leftPtr], leftPtrValue);
            }
            leftPtr++;
        }
    }
    return false;
};
