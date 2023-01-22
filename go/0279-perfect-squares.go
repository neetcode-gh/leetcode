var MX = 10005

func numSquares(n int) int {
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = MX
	}

	dp[0] = 0
	for i := 1; i <= n; i++ {
		mn := MX
		j := 1
		for i-j*j >= 0 {
			mn = min(mn, dp[i-j*j]+1)
			j++
		}
		dp[i] = mn
	}
	return dp[n]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
