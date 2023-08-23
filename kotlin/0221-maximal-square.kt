class Solution {
    fun maximalSquare(g: Array<CharArray>): Int {
        var dp = Array(g.size) { IntArray(g[0].size)}

        val m = g.lastIndex
        val n = g[0].lastIndex
        var res = 0
        for (i in m downTo 0) {
            for (j in n downTo 0) {
                if (g[i][j] == '0')
                    continue

                dp[i][j] = 1 + minOf(
                    if (i < m && j < n) dp[i + 1][j + 1] else 0,
                    if (i < m) dp[i + 1][j] else 0,
                    if (j < n) dp[i][j + 1] else 0
                )

                res = maxOf(
                    res,
                    dp[i][j]
                )
            }
        }

        return res * res
    }
}
