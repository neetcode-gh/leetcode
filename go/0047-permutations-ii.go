func permuteUnique(nums []int) [][]int {
	numLen := len(nums)
	res := [][]int{}
	counter := make(map[int]int)

	for _, n := range nums {
		counter[n]++
	}

	var backtrack func([]int, map[int]int)

	backtrack = func(perm []int, counter map[int]int) {
		if len(perm) == numLen {
			res = append(res, append([]int{}, perm...))
			return
		}

		for n, count := range counter {
			if count == 0 {
				continue
			}
			perm = append(perm, n)
			counter[n]--
			backtrack(perm, counter)
			perm = perm[:len(perm)-1]
			counter[n]++
		}
	}

	backtrack([]int{}, counter)

	return res
}
