func uniquePaths(m int, n int) int {
	dp := make([]int, n)
	dp[0] = 1

	for i := 0; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[j] += dp[j-1]
		}
	}

	return dp[n-1]
}