func maxProfit(prices []int) int {
	min := math.MaxUint32
	res := 0

	for _, price := range prices {
		if price > min {
			if price-min > res {
				res = price - min
			}
		} else {
			min = price
		}
	}

	return res
}