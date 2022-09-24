class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = nums[0]
        var curMin = 1
        var curMax = 1
        
        for (n in nums) {
            val temp = curMax * n
            curMax = maxOf(n * curMax, n * curMin, n)
            curMin = minOf(temp, n * curMin, n)
            res = maxOf(res, curMax)
        }
        return res
    }
}