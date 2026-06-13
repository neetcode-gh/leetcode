// Easy Solution
func findKthLargest(nums []int, k int) int {
	sort.Ints(nums)
	return nums[len(nums)-k]
}

// Kth largest element in array using Quick Select Algorithm
func findKthLargestQuickSelect(nums []int, k int) int {
	k = len(nums) - k
	var quickSelect func(l, r int) int
	quickSelect = func(l, r int) int {
		pivot, p := nums[r], l
		for i := l; i < r; i++ {
			if nums[i] <= pivot {
				nums[p], nums[i] = nums[i], nums[p]
				p += 1
			}
		}
		nums[p], nums[r] = nums[r], nums[p]
		if p > k {
			return quickSelect(l, p-1)
		} else if p < k {
			return quickSelect(p+1, r)
		} else {
			return nums[p]
		}
	}
	return quickSelect(0, len(nums)-1)
}
