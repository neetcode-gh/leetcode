package besttimetobuyandsellstock

func maxProfit(prices []int) int {
	var maxProfit int
	leftPointer := 0
	rightPointer := 1

	for rightPointer < len(prices) {
		if prices[leftPointer] < prices[rightPointer] {
			profit := prices[rightPointer] - prices[leftPointer]
			maxProfit = max(maxProfit, profit)
		} else {
			leftPointer = rightPointer
		}
		rightPointer++
	}

	return maxProfit
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
