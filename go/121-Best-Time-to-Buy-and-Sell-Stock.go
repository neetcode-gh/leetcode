package leetcode

import "math"

func maxProfit(prices []int) int {
	left := 0
	right := 1
	maxProf := 0
	profit := 0

	for right < len(prices) {
		if prices[left] < prices[right] {
			profit = prices[right] - prices[left]
			maxProf = int(math.Max(float64(profit), float64(maxProf)))
		} else {
			left = right
		}
		right++
	}

	return maxProf
}
