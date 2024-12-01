package threeSumClosest

import (
	"math"
	"sort"
)

func threeSumClosest(nums []int, target int) int {
	Length := len(nums)
	// Sort given array of numbers
	sort.Ints(nums)
	var left, right, sum, diff, result int
	min := math.MaxInt
	for i := 0; i < Length-2; i++ {
		left = i + 1
		right = Length - 1
		for left < right {
			sum = nums[left] + nums[right] + nums[i]
			// Calculate the distance between the target and sum
			diff = int(math.Abs(float64(target - sum)))
			if sum < target {
				left++
			} else if sum > target {
				right--
			} else {
				return sum
			}
			// Check for smallest distance from the target
			if diff < min {
				min = diff
				result = sum
			}
		}
	}
	return result
}
