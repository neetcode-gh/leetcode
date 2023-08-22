class Solution {
    fun lastStoneWeightII(stones: IntArray): Int {
        val sum = stones.sum()!!
        val target = Math.ceil(sum.toDouble() / 2).toInt()
        val dp = Array (stones.size) { IntArray (sum) { -1 } }

        fun dfs(i: Int, cur: Int): Int {
            if (cur >= target || i == stones.size)
                return Math.abs(cur - (sum - cur))
            if (dp[i][cur] != -1)
                return dp[i][cur]

            dp[i][cur] = minOf(
                dfs(i + 1, cur),
                dfs(i + 1, cur + stones[i])
            )

            return dp[i][cur]
        }

        return dfs(0, 0)
    }
}
