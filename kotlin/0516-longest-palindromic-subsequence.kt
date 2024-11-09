class Solution {
    fun longestPalindromeSubseq(s1: String): Int {
        val s2 = s1.reversed()
        val n = s1.length
        val m = s2.length
        val dp = Array(n+1){ IntArray(m+1) }

        for (i in 0 until n) {
            for (j in 0 until m) {
                if(s1[i] == s2[j])
                    dp[i+1][j+1] = 1 + dp[i][j]
                else
                    dp[i+1][j+1] = maxOf(dp[i][j+1], dp[i+1][j])
            }
        }

        return dp[n][m]
    }
}
