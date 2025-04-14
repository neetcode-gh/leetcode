class Solution {
	fun longestCommonSubsequence(text1: String, text2: String): Int {
		if (text1.isEmpty() || text2.isEmpty()) {
			return 0
		}

		val M = text1.length
		val N = text2.length

		val dp = Array(M + 1){IntArray(N + 1){0}}

		for (i in 1..M) {
			for (j in 1..N) {
				if (text1[i - 1] == text2[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1] + 1
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
				}
			}
		}
		return dp[M][N]
	}
}