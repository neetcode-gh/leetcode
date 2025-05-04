func sortArray(nums []int) []int {
    for i := 1; i < len(nums); i++ {
		current := i - 1
		for current >= 0 && nums[current] > nums[current+1] {
			if nums[current] > nums[current+1] {
				nums[current], nums[current+1] = swapNumbers(nums[current], nums[current+1])
			}
			current--
		}
	}
    return nums
}

// just swap 2 numbers
func swapNumbers(first, second int) (int, int) {
	return second, first
}
