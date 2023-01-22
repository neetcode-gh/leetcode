func coinChange(coins []int, amount int) int {
	changes := make([]int, amount+1)
	for i := range changes {
		changes[i] = amount + 1
	}
	changes[0] = 0

	for i := 1; i < amount+1; i++ {
		for _, c := range coins {
			if c <= i {
				changes[i] = min(changes[i], 1+changes[i-c])
			}
		}
	}
	if changes[amount] != amount+1 {
		return changes[amount]
	}
	return -1
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}
