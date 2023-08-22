class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        val dp = IntArray(target + 1)
        
        dp[0] = 1
        for (i in 1..target) {
            for (n in nums) {
                if(i - n >= 0) dp[i] += dp[i - n]
            }
        }

        return dp[target]
    }
}
