package main

func twoSum(nums []int, target int) []int {
	prevMap := make(map[int]int)
	for i, num := range nums {
		if j, ok := prevMap[target-num]; ok {
			return []int{j, i}
		}
		prevMap[num] = i
	}
	return []int{}
}
