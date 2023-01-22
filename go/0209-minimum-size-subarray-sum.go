/*
Time: O(n)
Space: O(1)
*/

func minSubArrayLen(target int, nums []int) int {
	minSize := len(nums) + 1
	L := 0
	curSum := 0

	for R := range nums {
		curSum += nums[R]
		for curSum >= target {
			if R+1-L < minSize {
				minSize = R + 1 - L
			}
			curSum -= nums[L]
			L += 1
		}
	}
	if minSize == len(nums)+1 {
		return 0
	}
	return minSize
}
