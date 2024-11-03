func leastBricks(wall [][]int) int {

	countGap := make(map[int]int)
	rowSum := 0

	for _, row := range wall {
		rowSum = 0
		for _, brick := range row[0 : len(row)-1] {
			rowSum += brick
			countGap[rowSum]++
		}
	}

	mostFrequentGap := 0
	for _, gapFrequency := range countGap {
		if gapFrequency > mostFrequentGap {
			mostFrequentGap = gapFrequency
		}
	}

	return len(wall) - mostFrequentGap
}