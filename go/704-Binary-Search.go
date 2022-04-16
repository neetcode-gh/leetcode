package leetcode

import "math"

func search(nums []int, target int) int {

	left := 0
	right := len(nums) - 1

	for left <= right {
		middle := int(math.Floor(float64((left + right) / 2)))

		if nums[middle] == target {
			return middle
		} else if nums[middle] < target {
			left = middle + 1
		} else {
			right = middle - 1
		}
	}

	return -1
}
