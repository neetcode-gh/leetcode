func rearrangeArray(nums []int) []int {
	sort.Ints(nums)
	res := []int{}

	l, r := 0, len(nums)-1
	for len(res) != len(nums) {
		res = append(res, nums[l])
		l += 1

		if l <= r {
			res = append(res, nums[r])
			r -= 1
		}
	}
	return res
}
