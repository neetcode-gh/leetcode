func productExceptSelf(nums []int) []int {
	res := make([]int, len(nums))

	total := nums[0]
	res[0] = 1
	for i := 1; i < len(nums); i++ {
		res[i] = total

		total *= nums[i]
	}

	total = nums[len(nums)-1]
	for i := len(nums) - 2; i >= 0; i-- {
		res[i] *= total

		total *= nums[i]
	}

	return res
}