/**
 * Sliding Window 
 * Time O(n) | Space O(1)
 * https://leetcode.com/problems/binary-subarrays-with-sum/
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function(nums, goal) {
    return subArrLessThanOrEqualK(nums, goal) - subArrLessThanOrEqualK(nums, goal-1);
};

const subArrLessThanOrEqualK = (arr, k) => {


    if (k < 0) return 0;
    let left = 0;
    let right = 0;
    let currSum = 0;
    let total = 0;
    
    while (right < arr.length) {
        
        currSum += arr[right];

        while (left < right && currSum > k) {
            currSum -= arr[left];
            left++;
        }

        if (currSum <= k) {
            total += (right - left + 1);
        }
        right++;
    }

    return total;
}
