package main

func main() {

}

func maxSubarraySumCircular(nums []int) int {
	globalMax, globalMin := nums[0], nums[0]
	currentMax, currentMin := 0, 0
	total := 0

	for _, num := range nums {
		currentMax = max(num, currentMax+num)
		currentMin = min(num, currentMin+num)
		total += num
		globalMax = max(globalMax, currentMax)
		globalMin = min(globalMin, currentMin)
	}

	if globalMax > 0 {
		return max(globalMax, total-globalMin)
	} else {
		return globalMax
	}

}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
