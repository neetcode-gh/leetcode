/**
 * Linear 
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = (nums) => {
    let [left, right] = [0, 0];

    while (right < nums.length) {
        const [leftVal, rightVal] = [nums[left], nums[right]];

        const isEqual = (rightVal === leftVal);
        if (!isEqual) {
            left++;
            nums[left] = rightVal;
        }

        right++;
    }

    return (left + 1);
};
