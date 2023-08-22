class Solution {
    fun maxSubarraySumCircular(nums: IntArray): Int {
        if (nums.size == 1) return nums[0]
        // max sum
        var totalSum = nums[0]
        var maxSum = nums[0]
        var currentMaxSum = nums[0]
        // minSum
        var minSum = nums[0]
        var currentMinSum = nums[0]
        for (i in 1..nums.lastIndex) {
            // max sum computation
            currentMaxSum = maxOf(nums[i], currentMaxSum + nums[i])
            maxSum = maxOf(maxSum, currentMaxSum)
            // minSum computation
            currentMinSum = minOf(nums[i], currentMinSum + nums[i])
            minSum = minOf(minSum, currentMinSum)
            totalSum += nums[i]
        }
        return if (minSum != totalSum) maxOf((totalSum - minSum), maxSum) else maxSum
    }
}