package go

import (
	"math"
)
func compute(coins []int, rem int, counts []int) int {
	if rem < 0 {
			return -1
	}
	if rem == 0 {
			return 0
	}
	if counts[rem - 1] != 0 {
			return counts[rem - 1]
	}
	//get max value of int
	min := math.MaxInt32
	for _, coin := range(coins) {
			res := compute(coins, rem - coin, counts)
			if res >= 0 && res < min {
					min = res + 1
			}
	}

	if min == math.MaxInt32 {
			counts[rem - 1] = -1
	} else {
		counts[rem - 1] = min
	}
	return counts[rem - 1]
}

func coinChange(coins []int, amount int) int {
	if amount < -1 {
			return 0
	}
	return compute(coins, amount, make([]int, amount))
}
