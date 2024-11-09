/*
* Recursion/DFS + memoization
*/
class Solution {
    fun countGoodStrings(low: Int, high: Int, zero: Int, one: Int): Int {
        val dp = IntArray(high + 1) { -1 }
        val mod = 1000000007

        fun dfs(i: Int): Int {
            if (i > high) 
                return 0
            if (dp[i] != -1)
                return dp[i]
            
            dp[i] = if (i >= low) 1 else 0
            dp[i] += dfs(i + zero) + dfs(i + one)
            dp[i] = dp[i] % mod

            return dp[i]
        }

        return dfs(0)
    }
}

/*
* Bottom up DP
*/
class Solution {
    fun countGoodStrings(low: Int, high: Int, zero: Int, one: Int): Int {
        val dp = IntArray(high + 1)
        val mod = 1000000007

        dp[0] = 1
        for (i in 1..high) {
            dp[i] += if (i - one >= 0) dp[i - one] else 0
            dp[i] += if (i - zero >= 0) dp[i - zero] else 0
            dp[i] = dp[i] % mod
        }

        var sum = 0
        for (i in low..high) sum = (sum + dp[i]) % mod
        return sum
    }
}
