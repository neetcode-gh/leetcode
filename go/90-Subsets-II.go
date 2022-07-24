package main

import "sort"

func subsetsWithDup(nums []int) [][]int {
	n := len(nums)
	ans := make([][]int, 0, 1<<n)
	curr := make([]int, 0, n)
	sort.Ints(nums)
	var backtrack func(idx int)
	backtrack = func(idx int) {
		ans = append(ans, append([]int{}, curr...))
		for i := idx; i < n; i++ {
			if i > idx && nums[i] == nums[i-1] {
				continue
			}
			curr = append(curr, nums[i])
			//not backtrack(idx + 1)!!
			backtrack(i + 1)
			curr = curr[:len(curr)-1]
		}
	}
	backtrack(0)
	return ans
}
