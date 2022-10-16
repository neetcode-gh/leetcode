class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
      val dp = Array(m + 1) { IntArray(n + 1) { 0 } }
        val indexM = m - 1
        val indexN = n - 1
        for (i in indexM downTo 0) {
            for (j in indexN downTo 0) {
                if (i == indexM && j == indexN) {
                    dp[i][j] = 1
                } else {
                    dp[i][j] = dp[i + 1][j] + dp[i][j + 1]
                }
            }
        }
        return dp[0][0]
    }
}