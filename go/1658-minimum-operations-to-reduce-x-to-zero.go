func minOperations(nums []int, x int) int {
	sum := 0
	for _, num := range nums {
		sum += num
	}

	target := sum - x
	currSum := 0
	maxWindow := -1
	l := 0
	for r := range len(nums) {
		currSum += nums[r]

		for l <= r && currSum > target {
			currSum -= nums[l]
			l += 1
		}

		if currSum == target {
			maxWindow = max(maxWindow, r-l+1)
		}
	}

	if maxWindow == -1 {
		return maxWindow
	}
	return len(nums) - maxWindow
}
