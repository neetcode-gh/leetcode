/**
 * https://leetcode.com/problems/3sum/
 * Time O(N ^ 2) | Space O(N)
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b );
    let outputArr = [];
    let numOne, numTwo, numThree;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        numOne = nums[i];
        // do twoSum
        let [left, right] = [i+1, nums.length - 1];
        while (left < right) {
            // find two sums that equal 0 when added to first number
            [numTwo, numThree] = [nums[left], nums[right]];
            // continue if duplicate
            if (left > i+1 && numTwo == nums[left - 1]) {
                left++;
            } else if ((numOne + numTwo + numThree) > 0) {
                right--;
            } else if ((numOne + numTwo + numThree) < 0) {
                left++;
            } else {
                outputArr.push([numOne, numTwo, numThree]);
                left++; right--;
            }
        }
    }
    return outputArr;
};
