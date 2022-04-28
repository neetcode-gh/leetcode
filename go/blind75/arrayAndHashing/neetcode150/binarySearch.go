package main

import "fmt"

func main() {
	nums := []int{-1, 3, 4, 6, 7, 8}
	target := 2

	fmt.Println(binarySearch(nums, target))
}

func binarySearch(nums []int, target int) bool {
	left := 0
	right := len(nums) - 1
	for left <= right {
		middle := int((left + right) / 2)
		if nums[left] > target || nums[right] < target {
			return false
		}
		if nums[left] == target || nums[right] == target || nums[middle] == target {
			return true
		}
		if nums[middle] > target {
			right = middle - 1
		} else {
			left = middle + 1
		}
	}
	return false
}
