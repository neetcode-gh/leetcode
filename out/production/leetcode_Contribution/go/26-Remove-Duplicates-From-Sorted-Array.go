func removeDuplicates(nums []int) int {
	length := len(nums)
	if length < 2 {
		return length
	}
	k, i := 1, 1
	for i < length {
		if nums[i] != nums[i-1] {
			nums[k] = nums[i]
			k++
		}
		i++
	}
	return k
}
