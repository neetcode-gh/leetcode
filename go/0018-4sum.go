func fourSum(nums []int, target int) [][]int {
	if len(nums) < 4 {
		return [][]int{}
	}

	sort.Ints(nums)

	result := make([][]int, 0)

	for i, ival := range nums {
		if i != 0 && nums[i] == nums[i - 1] {
			continue
		}

		for j := i + 1; j < len(nums) - 1; j++ {
			if j != i+1 && nums[j] == nums[j-1] {
				continue
			}

			jval := nums[j]

			for l, r := j+1, len(nums) - 1; l < r; {
				lval, rval := nums[l], nums[r]

				sum := ival + jval + lval + rval
				switch {
				case sum < target:
					l++
				case sum > target:
					r--
				default:
					result = append(result, []int{ival, jval, lval, rval})
					for ; l < r && nums[l] == nums[l+1]; l++ {
					}
					for ; l < r && nums[r] == nums[r-1]; r-- {
					}
					l++
					r--
				}
			}
		}
	}

	return result
}