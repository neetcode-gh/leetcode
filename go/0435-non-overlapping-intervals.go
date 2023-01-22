func eraseOverlapIntervals(intervals [][]int) int {
	const (
		start = 0
		end   = 1
	)
	sort.Slice(intervals, func(i, j int) bool { return intervals[i][start] < intervals[j][start] })

	numRemovals := 0
	currEnd := intervals[0][end]

	for i := 1; i < len(intervals); i++ {
		currInterval := intervals[i]

		if currInterval[start] < currEnd {
			numRemovals += 1
			currEnd = min(currInterval[end], currEnd)
		} else {
			currEnd = currInterval[end]
		}
	}

	return numRemovals
}

func min(i, j int) int {
	if i < j {
		return i
	} else {
		return j
	}
}