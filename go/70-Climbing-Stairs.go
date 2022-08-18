func climbStairs(n int) int {
	one, two := 1, 1

	for i := 0; i < n-1; i++ {
		sum := one + two
		one, two = two, sum
	}

	return two
}