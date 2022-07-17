package kokoeatingbananas

import (
	"fmt"
	"math"
)

func minEatingSpeed(piles []int, h int) int {
	left := 1
	right := getMax(piles)
	fmt.Println(right)
	for left < right {
		middle := (left + right) / 2
		hours := 0.0
		for _, value := range piles {
			hours += math.Ceil(float64(value) / float64(middle))
		}

		if int(hours) <= h {
			right = middle
		} else {
			left = middle + 1
		}
	}
	return right
}

func getMax(arr []int) int {
	maxValue := -2147483648
	for i := range arr {
		if arr[i] > maxValue {
			maxValue = arr[i]
		}
	}
	return maxValue
}
