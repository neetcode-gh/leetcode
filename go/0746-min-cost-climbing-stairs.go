func minCostClimbingStairs(cost []int) int {
	n := len(cost)
	dp := make([]int, n+1)

	if n == 2 {
		return min(cost[0], cost[1])
	}

	for i := 2; i <= n; i++ {
		a := dp[i-1] + cost[i-1]
		b := dp[i-2] + cost[i-2]

		dp[i] = min(a, b)
	}

	return dp[n]
}

func min(x, y int) int {
	if x > y {
		return y
	}

	return x
}