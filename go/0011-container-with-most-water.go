func maxArea(height []int) int {
	l, r := 0, len(height)-1
	res := 0

	for l < r {
		area := min(height[l], height[r]) * (r - l)

		if area > res {
			res = area
		}

		if height[l] <= height[r] {
			l++
		} else {
			r--
		}
	}
	return res
}