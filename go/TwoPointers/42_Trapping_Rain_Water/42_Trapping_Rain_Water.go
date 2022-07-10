package trappingrainwater

func populateMaxValuesToLeft(height []int) []int {
	leftArray := make([]int, len(height))
	leftArray[0] = 0
	currMax := height[0]
	for i := 1; i < len(leftArray); i++ {
		if height[i] > currMax {
			leftArray[i] = height[i]
			currMax = height[i]
		} else {
			leftArray[i] = currMax
		}
	}
	return leftArray
}

func populateMaxValuesRight(height []int) []int {
	rightMaxArray := make([]int, len(height))
	rightMaxArray[len(rightMaxArray)-1] = 0
	currMax := height[len(rightMaxArray)-1]
	i := len(rightMaxArray) - 2
	for i >= 0 {
		if height[i] > currMax {
			rightMaxArray[i] = height[i]
			currMax = height[i]
		} else {
			rightMaxArray[i] = currMax
		}
		i--
	}
	return rightMaxArray
}

func trap(height []int) int {
	leftMaxArray := populateMaxValuesToLeft(height)
	rightMaxArray := populateMaxValuesRight(height)
	trappedWaterArray := make([]int, len(height))
	trappedWaterArray[0] = 0
	trappedWaterArray[len(height)-1] = 0
	for i := 1; i < len(height)-1; i++ {
		minHeightToTrap := min(leftMaxArray[i], rightMaxArray[i])
		// trapped water is min height - current height
		trappedWater := minHeightToTrap - height[i]
		trappedWaterArray[i] = trappedWater
	}
	return sum(trappedWaterArray)
}

func min(i, j int) int {
	if i > j {
		return j
	}
	return i
}

func sum(arr []int) int {
	var sum int
	for _, value := range arr {
		sum += value
	}
	return sum
}
