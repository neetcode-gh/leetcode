package threesum

import (
	"fmt"
	"sort"
)

func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	fmt.Println(nums)
	result := [][]int{}
	for i := 0; i < len(nums); i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		newTarget := 0 - nums[i]
		leftPointer := i + 1
		rightPointer := len(nums) - 1
		for leftPointer < rightPointer {
			if newTarget == nums[leftPointer]+nums[rightPointer] {
				result = append(result, []int{nums[i], nums[leftPointer], nums[rightPointer]})
				leftPointer++
				for nums[leftPointer] == nums[leftPointer-1] && leftPointer < rightPointer {
					leftPointer++
				}
			}
			if nums[leftPointer]+nums[rightPointer] < newTarget {
				leftPointer++
			} else {
				rightPointer--
			}
		}
	}
	return result
}
