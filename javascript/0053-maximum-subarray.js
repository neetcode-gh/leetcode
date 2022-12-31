/**
 * https://leetcode.com/problems/maximum-subarray/
 * Time O(N^2) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums, maxSum = -Infinity) {
    for (let i = 0, sum = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            maxSum = Math.max(maxSum, sum);
        }
    }

    return maxSum;
}

/**
 * https://leetcode.com/problems/maximum-subarray/
 * Time O(N * log(N)) | Space O(log(N))
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums, left = 0, right = nums.length - 1) {
    const isBaseCase = (right < left)
    if (isBaseCase) return -Infinity;

    const mid = (left + right) >> 1;
    const guess = nums[mid];
    const leftSum = getLeftSumFromMid(nums, mid, left)
    const rightSum = getRightSumFromMid(nums, mid, right)
    const sum = guess + leftSum + rightSum;
    
    const leftHalf = maxSubArray(nums, left, (mid - 1));
    const rightHalf = maxSubArray(nums, (mid + 1), right);

    return Math.max(sum, leftHalf, rightHalf);
}

const getLeftSumFromMid = (nums, mid, left, sum = 0, maxSum = 0) => {
    for (let i = (mid - 1); left <= i; i--) {
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum;
}

const getRightSumFromMid = (nums, mid, right, sum = 0, maxSum = 0) => {
    for (let i = (mid + 1); i <= right; i++) {
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum;
}

/**
 * https://leetcode.com/problems/maximum-subarray/
 * Time O(N) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let [ runningSum, maxSum ] = [ nums[0], nums[0] ]
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        const sum = runningSum + num
        
        runningSum = Math.max(num, sum)
        maxSum = Math.max(maxSum, runningSum)
    }
    
    return maxSum
};