func firstMissingPositive(nums []int) int {
	i, numsLen := 0, len(nums)

	for i < numsLen {
		j := nums[i] - 1

		if 0 <= j && j < numsLen && nums[i] != nums[j] {
			nums[i], nums[j] = nums[j], nums[i]
		} else {
			i++
		}
	}
	for i := 0; i < numsLen; i++ {
		if nums[i] != i+1 {
			return i + 1
		}
	}
	return numsLen + 1
}
