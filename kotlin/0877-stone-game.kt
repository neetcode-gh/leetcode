class Solution {
    fun stoneGame(piles: IntArray): Boolean {
        val dp = Array(piles.size) { IntArray(piles.size) { -1 } }

        fun dfs(left: Int, right: Int): Int {
            if (left > right) 
                return 0
            if (dp[left][right] != -1)
                return dp[left][right]

            val isEven = (right - left) % 2 == 0
            dp[left][right] = maxOf(
                dfs(left + 1, right) + if (isEven) piles[left] else 0,
                dfs(left, right - 1) + if (isEven) piles[right] else 0
            )

            return dp[left][right]
        }

        return dfs(0, piles.lastIndex) > (piles.sum()?: 0) / 2
    }
}
