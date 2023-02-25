class Solution {
    fun rob(nums: IntArray): Int {
        if (nums.isEmpty()) return 0
        if (nums.size == 1) return nums[0]
        return maxOf(rob_dp(nums, 0, nums.size-2), rob_dp(nums, 1, nums.size-1))
    }
    
    fun rob_dp(nums: IntArray, start: Int, end: Int): Int {
        if (nums.isEmpty()) return 0
        var pre2 = 0
        var pre1 = 0
        var curr = 0
        for (i in start..end) {
            curr = maxOf(pre1, pre2 + nums[i])
            pre2 = pre1
            pre1 = curr
        }
        return curr
    } 
}