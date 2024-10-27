class Solution {
    fun paintWalls(cost: IntArray, time: IntArray): Int {
        val n = cost.size
        val dp = Array (n) { IntArray (n + 1) { -1 } }

        fun dfs(i: Int, rem: Int): Int {
            if (rem <= 0) return 0
            if (i == n) return INFINITY
            if (dp[i][rem] != -1) return dp[i][rem]

            dp[i][rem] = minOf(
                cost[i] + dfs(i + 1, rem - 1 - time[i]),
                dfs(i + 1, rem)
            )

            return dp[i][rem]
        } 

        return dfs(0, n)
    }

    companion object {
        const val INFINITY = 500000001
    }
}
