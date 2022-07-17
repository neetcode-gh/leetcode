package binarysearch

func search(nums []int, target int) int {
	return binarySearch(&nums, target, 0, len(nums)-1)
}

func binarySearch(nums *[]int, target int, start int, end int) int {
	if start > end {
		return -1
	}
	mid := (start + end) / 2
	if (*nums)[mid] < target {
		return binarySearch(nums, target, mid+1, end)
	} else if (*nums)[mid] > target {
		return binarySearch(nums, target, start, mid-1)
	} else {
		return mid
	}

}
