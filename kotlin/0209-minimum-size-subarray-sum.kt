class Solution {
    fun minSubArrayLen(target: Int, nums: IntArray): Int {
        var windowSum = 0
        var left = 0
        var right = 0
        var res = Integer.MAX_VALUE
        
        while (right < nums.size) {
            windowSum += nums[right++]
            while (left < nums.size && windowSum >= target) {
                res = minOf(res, right - left)
                windowSum -= nums[left++]
            }
        }

        return if (res == Integer.MAX_VALUE) 0 else res
    }
}
