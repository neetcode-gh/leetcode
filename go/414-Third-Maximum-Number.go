package go

import (
	"sort"
	"fmt"
)

func MinMax(array []int) (int, int) {
var max int = array[0]
var min int = array[0]
for _, value := range array {
	if max < value {
		max = value
	}
	if min > value {
		min = value
	}
}
return min, max
}

func thirdMax(nums []int) int {
	//sort descending order
	sort.Sort(sort.Reverse(sort.IntSlice(nums)))

	var minCounter int = 1
	var sameValue int = nums[0]
	for i := 1; i < len(nums); i++ {
			if sameValue != nums[i] {
					minCounter += 1
					sameValue = nums[i]
			}
			if minCounter == 3 {
					return nums[i]
			}
	}
	_, max := MinMax(nums)
	return max
}
