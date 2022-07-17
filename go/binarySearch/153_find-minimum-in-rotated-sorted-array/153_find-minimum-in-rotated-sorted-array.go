package findminimuminrotatedsortedarray

func findMin(nums []int) int {
	result := nums[0]
	left, right := 0, len(nums)-1
	for left <= right {
		if nums[left] <= nums[right] {
			result = min(result, nums[left])
			break
		}
		mid := (left + right) / 2
		result = min(result, nums[mid])
		if nums[mid] >= nums[left] {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return result
}

func min(i, j int) int {
	if i < j {
		return i
	}
	return j
}
