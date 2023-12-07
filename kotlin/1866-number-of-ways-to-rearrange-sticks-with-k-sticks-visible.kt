// Dp bottom up
class Solution {
    fun rearrangeSticks(n: Int, k: Int): Int {
        val mod = 1_000_000_000 + 7
        val dp = Array (n + 1) { LongArray (k + 1) }
        
        dp[1][1] = 1
        for (i in 2..n) {
            for (j in 1..k) {
                dp[i][j] = (dp[i - 1][j - 1] + ((i - 1) * dp[i - 1][j])) % mod
            }
        }

        return dp[n][k].toInt()
    }
}

// Recursion + memoization
class Solution {
    fun rearrangeSticks(n: Int, k: Int): Int {
        val mod = 1_000_000_000 + 7
        val dp = Array (n + 1) { LongArray (k + 1) { -1L } }

        fun dfs(n: Int, k: Int): Long {
            if (n == k) return 1
            if (n == 0 || k == 0) return 0
            if (dp[n][k] != -1L) return dp[n][k]

            dp[n][k] = dfs(n - 1, k - 1) + ((n - 1) * dfs(n - 1, k))

            return dp[n][k] % mod
        }

        return dfs(n, k).toInt()
    }
}
