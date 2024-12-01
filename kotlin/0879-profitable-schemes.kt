/*
* DFS with memoization
*/
class Solution {
    fun profitableSchemes(n: Int, minProfit: Int, group: IntArray, profit: IntArray): Int {
        val mod = 1000000000 + 7
        val dp = Array(group.size) { Array(n + 1) { IntArray(minProfit + 1) {-1} } }

        fun dfs(i: Int, n: Int, p: Int): Int {
            if (i == group.size)
                return if (p >= minProfit) 1 else 0

            val t = minOf(p, minProfit)
            if (dp[i][n][t] != -1)
                return dp[i][n][t]

            dp[i][n][t] = dfs(i + 1, n, t) % mod
            if (n - group[i] >= 0)
                dp[i][n][t] += dfs(i + 1, n - group[i], t + profit[i]) % mod

            return dp[i][n][t]
        }

        return dfs(0, n, 0) % mod
    }
}
