func sortColors(nums []int) {
	low, mid, hi := 0, 0, len(nums)-1

	for low <= hi {
		if nums[low] == 2 {
			nums[low], nums[hi] = nums[hi], nums[low]
			hi--
		} else if nums[low] == 0 {
			nums[low], nums[mid] = nums[mid], nums[low]
			mid++
			low++
		} else {
			low++
		}
	}
}