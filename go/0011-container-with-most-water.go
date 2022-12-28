func maxArea(height []int) int {
	left := 0
	right := len(height) - 1
	res := 0

	for left < right {
		area := min(height[left], height[right]) * (right - left)

		if area > res {
			res = area
		}

		if height[left] > height[right] {
			right--
		} else {
			left++
		}
	}

	return res
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}