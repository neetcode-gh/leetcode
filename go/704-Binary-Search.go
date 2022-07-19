func search(nums []int, target int) int {
	// [lo, hi] are the valid indices we're looking for the target value
	lo, hi := 0, len(nums)-1
	for lo <= hi {
		mid := (lo + hi) / 2
		// since the nums is sorted in ascending order,
		// if the mid value equals the target return the mid value
		// else if the mid value is greater than the target, then target can't be after mid value, decrease hi
		// else target can't be before the mid value, increase lo
		if nums[mid] == target {
			return mid
		} else if nums[mid] > target {
			hi = mid - 1
		} else {
			lo = mid + 1
		}
	}

	// if the target isn't found return -1
	return -1
}
