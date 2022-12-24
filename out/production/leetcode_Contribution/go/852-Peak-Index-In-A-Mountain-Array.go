func peakIndexInMountainArray(arr []int) int {
	left, right := 0, len(arr)-1
	res := -1

	for left <= right {
		mid := left + (right-left+1)/2

		if arr[mid-1] <= arr[mid] {
			left, res = mid+1, mid
		} else {
			right = mid - 1
		}
	}

	return res
}