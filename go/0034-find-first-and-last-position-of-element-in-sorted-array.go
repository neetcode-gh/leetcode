func searchRange(nums []int, target int) []int {
	right := binSearch(nums, target, false)
	left := binSearch(nums, target, true)
	return []int{left, right}
}

func binSearch(nums []int, target int, leftBias bool) int {
	l, r := 0, len(nums)-1
	i := -1
	for l <= r {
		m := (l + r) / 2
		if nums[m] < target {
			l = m + 1
		} else if nums[m] > target {
			r = m - 1
		} else {
			i = m
			if leftBias {
				r = m - 1
			} else {
				l = m + 1
			}
		}
	}
	return i
}