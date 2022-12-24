package main

import "sort"

func combinationSum2(candidates []int, target int) [][]int {
	ans := make([][]int, 0)
	curr := make([]int, 0)
	sort.Ints(candidates)
	var backtrack func(idx int, currSum int, curr []int)
	backtrack = func(idx int, currSum int, curr []int) {
		if currSum == target {
			ans = append(ans, append([]int{}, curr...))
			return
		}
		if currSum > target {
			return
		}
		for i := idx; i < len(candidates); i++ {
			if i > idx && candidates[i] == candidates[i-1] {
				continue
			}
			curr = append(curr, candidates[i])
			backtrack(i+1, currSum+candidates[i], curr)
			curr = curr[:len(curr)-1]
		}

	}
	backtrack(0, 0, curr)
	return ans
}
