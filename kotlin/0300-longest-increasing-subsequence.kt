class Solution {
    fun lengthOfLIS(nums: IntArray): Int {
        val dp = IntArray(nums.size){1}
        for(i in nums.size-1 downTo 0){
            for(j in i+1 until nums.size){
                if(nums[i] < nums[j]){
                    dp[i] = maxOf(dp[i], 1 + dp[j])
                }
            }
        }
        var max = 0
        for(n in dp)
            max = maxOf(max, n)
        return max
    }
}
