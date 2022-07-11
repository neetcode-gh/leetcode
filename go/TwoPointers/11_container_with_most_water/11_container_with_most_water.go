package containerwithmostwater

func maxArea(height []int) int {
	var maxArea int
	leftPointer := 0
	rightPointer := len(height) - 1
	for leftPointer < rightPointer {
		area := (rightPointer - leftPointer) * min(height[leftPointer], height[rightPointer])
		maxArea = max(area, maxArea)
		if height[leftPointer] < height[rightPointer] {
			leftPointer++
		} else {
			rightPointer--
		}
	}
	return maxArea
}

func min(i, j int) int {
	if i < j {
		return i
	}
	return j
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
