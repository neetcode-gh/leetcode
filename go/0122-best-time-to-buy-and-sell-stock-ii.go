func maxProfit(prices []int) int {
	var maxProfit int

	for i := 0; i < len(prices) - 1; i++ {
		if prices[i] < prices[i+1] {
			maxProfit += prices[i+1] - prices[i]
		}
	}

	return maxProfit
}
