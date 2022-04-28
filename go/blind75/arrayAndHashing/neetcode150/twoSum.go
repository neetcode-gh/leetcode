package main

import "fmt"

func main() {
	var nums = []int{2, 70, 21, 7}
	target := 9
	var answer = []int{}
	answer = twoSum(nums, target)
	fmt.Println(answer[0], answer[1])
}

// o(n2) algorithm
/*
func twoSum(nums []int, target int) []int {

	for i := range nums {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return nil
}
*/

// time complexity -o(n) and space complexity o(n)

func twoSum(nums []int, target int) []int {
	var addTheValue = map[int]int{}

	for index, value := range nums {
		addTheValue[value] = index
		numValue, ok := addTheValue[target-value]
		if index > 0 && ok {
			return []int{numValue, index}
		}
	}
	return nil

}
