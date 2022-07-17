package searchinrotatedsortedarray

func search(nums []int, target int) int {
	left, right := 0, len(nums)-1

	for left <= right {
		mid := (left + right) / 2
		if nums[mid] == target {
			return mid
		}

		// Are we in the left sorted array or right sorted array. How to decide?
		// If the middle element is > nums[left] then we are in left sorted array
		// in right sorted array all the elements will be less than nums[0]

		if nums[mid] >= nums[left] {
			if target > nums[mid] {
				left = mid + 1 // search in right portion
			} else if target < nums[mid] && target < nums[left] {
				left = mid + 1 // search in right portion
			} else {
				// if target is less than nums[mid] and target is greater than nums[left] search in left side
				right = mid - 1
			}
		} else { // nums[mid] < nums[left]. pivot happened here all the elements after pivot would be less than nums[left]
			if target < nums[mid] {
				right = mid - 1 // search in left portion
			} else if target > nums[mid] && target > nums[right] {
				right = mid - 1 // search in left portion
			} else {
				left = mid + 1 // search in right portion
			}
		}
	}

	return -1
}
