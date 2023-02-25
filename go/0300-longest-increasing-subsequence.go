func lengthOfLIS(nums []int) int {
	cache := make([]int, len(nums))
	LIS := 0
	for i := range nums {
		curMax := 0
		for j := 0; j < i+1; j++ {
			if nums[j] < nums[i] {
				if curMax < cache[j] {
					curMax = cache[j]
				}
			}
		}
		cache[i] = curMax + 1
		if cache[i] > LIS {
			LIS = cache[i]
		}
	}
	return LIS
}
