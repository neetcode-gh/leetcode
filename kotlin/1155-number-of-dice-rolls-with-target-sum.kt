// dp, space complexity down from O(n * t) down to O(t)
class Solution {
    fun numRollsToTarget(n: Int, k: Int, t: Int): Int {
        val mod = 1_000_000_007
        var dp = LongArray (t + 1)

        dp[0] = 1

        for (d in 0 until n) {
            val nextDp = LongArray (t + 1)
            for (m in 1..k) {
                for (s in m..t)
                    nextDp[s] = (nextDp[s] + dp[s - m]) % mod
            }
            dp = nextDp
        }
        
        return dp[t].toInt()
    }
}

// recursion + memo
class Solution {
    fun numRollsToTarget(n: Int, k: Int, t: Int): Int {
        val mod = 1_000_000_007
        val dp = Array (n + 1) { LongArray (t + 1) { -1L } }
        
        fun dfs(n: Int, s: Int): Long {
            if (n < 0 || s > t) return 0
            if (s == t && n == 0) return 1
            if (dp[n][s] != -1L) return dp[n][s]

            var res = 0L
            for (m in 1..k)
                res = (res + dfs(n - 1, s + m)) % mod
            
            dp[n][s] = res
            return dp[n][s]
        }

        return (dfs(n, 0) % mod).toInt()
    }
}
