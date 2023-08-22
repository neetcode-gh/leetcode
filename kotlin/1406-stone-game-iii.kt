class Solution {
    fun stoneGameIII(s: IntArray): String {
        val dp = IntArray(s.size) { Integer.MIN_VALUE }

        fun dfs(i: Int): Int {
            if (i == s.size)
                return 0
            if (dp[i] != Integer.MIN_VALUE)
                return dp[i]

            var total = 0
            for (j in i until minOf(i + 3, s.size)) {
                total += s[j]
                dp[i] = maxOf(dp[i], total - dfs(j + 1))
            }

            return dp[i]
        }

        val sum = dfs(0)
        return if (sum > 0) "Alice" else if (sum < 0) "Bob" else "Tie"
    }
}
