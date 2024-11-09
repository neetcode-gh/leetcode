//dp solution
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

//recursion + memoization solution
class Solution {
    fun combinationSum4(nums: IntArray, target: Int): Int {
        val dp = HashMap<Int, Int>()
        
        fun dfs(sum: Int): Int {
            if (sum == target) return 1
            if (sum in dp) return dp[sum]!!

            var res = 0
            for (num in nums) {
                if (sum + num <= target)
                    res += dfs(sum + num)
            }

            dp[sum] = res
            return res
        }

        return dfs(0)
    }
}
