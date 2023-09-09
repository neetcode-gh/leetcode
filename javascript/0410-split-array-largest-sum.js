/**
 * https://leetcode.com/problems/split-array-largest-sum/
 * 
 * Binary Search
 * Time O(log(s)*n) (s = difference between the least and max possible value) | Space O(1)
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, k) {
    
    let left = Math.max(...nums);
    let right = nums.reduce((acc, num) => acc + num, 0);
    let result = right;
    while(left <= right) {
        const mid = (left + right) >> 1;
        if(canSplit(mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    function canSplit(largest) {
        let splitCount = 0;
        let currSum = 0;

        for(let i = 0; i < nums.length; i++) {
            currSum += nums[i];
            if(currSum > largest) {
                currSum = nums[i];
                splitCount++;
            }
        }

        return splitCount + 1 <= k;
    }

    return result;
};
