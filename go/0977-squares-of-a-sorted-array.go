func sortedSquares(nums []int) []int {
	sq := make([]int, len(nums))
	i := len(nums) - 1
	for l, r := 0, len(nums)-1; l <= r; {
		if abs(nums[l]) > abs(nums[r]) {
			sq[i] = nums[l] * nums[l]
			l++
		} else {
			sq[i] = nums[r] * nums[r]
			r--
		}
		i--
	}
	return sq
}

func abs(x int) int {
	if x < 0 {
		x = x * -1
	}
	return x
}