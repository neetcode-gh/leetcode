func wiggleSort(nums []int) {
	sort.Ints(nums)
	for ind := 1; ind < len(nums)-1; ind += 2 {
		nums[ind], nums[ind+1] = nums[ind+1], nums[ind]
	}
}