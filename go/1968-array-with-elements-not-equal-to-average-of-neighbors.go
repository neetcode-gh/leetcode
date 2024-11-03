func rearrangeArray(nums []int) []int {
	sort.Ints(nums)
	res := []int{}

	l, r := 0, len(nums)-1
	for len(res) != len(nums) {
		res = append(res, nums[l])
		l++

		if l <= r {
			res = append(res, nums[r])
			r--
		}
	}
	return res
}
